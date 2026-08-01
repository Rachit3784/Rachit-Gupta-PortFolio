"use client";
// src/components/chat/VideoCallModal.js — macOS Style WebRTC P2P Video Call Overlay
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Maximize2, Minimize2, Shield, User } from 'lucide-react';
import { startRingtoneSound, stopRingtoneSound } from '@/utils/audioUtils';
import { socket } from '@/lib/socket';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
  ],
};

const VideoCallModal = ({ isOpen, onClose, user, isIncoming = false, incomingSignal = null }) => {
  const [micOn, setMicOn]         = useState(true);
  const [camOn, setCamOn]         = useState(true);
  const [callState, setCallState] = useState(isIncoming ? 'incoming' : 'calling'); // 'calling' | 'incoming' | 'connected' | 'ended'
  const [isFullscreen, setFullscreen] = useState(false);

  const localVideoRef        = useRef(null);
  const remoteVideoRef       = useRef(null);
  const peerRef              = useRef(null);
  const localStreamRef       = useRef(null);
  const pendingCandidatesRef = useRef([]);

  const flushIceCandidates = async () => {
    if (!peerRef.current || !peerRef.current.remoteDescription) return;
    while (pendingCandidatesRef.current.length > 0) {
      const cand = pendingCandidatesRef.current.shift();
      try {
        await peerRef.current.addIceCandidate(new RTCIceCandidate(cand));
      } catch (e) {
        console.warn('Error flushing ICE candidate:', e);
      }
    }
  };

  /* ── Initialize local media stream & WebRTC ── */
  useEffect(() => {
    if (!isOpen) return;

    setCallState(isIncoming ? 'incoming' : 'calling');
    pendingCandidatesRef.current = [];

    if (isIncoming) {
      startRingtoneSound();
    }

    let mounted = true;

    const startCall = async () => {
      try {
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: { echoCancellation: true, noiseSuppression: true },
          });
        } catch (camErr) {
          console.warn('Camera/mic fallback attempt', camErr);
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          } catch {
            stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
          }
        }

        if (!mounted) return;
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize PeerConnection
        const peer = new RTCPeerConnection(ICE_SERVERS);
        peerRef.current = peer;

        // Add local tracks to peer
        stream.getTracks().forEach((track) => {
          track.enabled = true;
          peer.addTrack(track, stream);
        });

        // Listen for remote track
        peer.ontrack = (event) => {
          console.log('📹 WebRTC remote track received:', event);
          const remoteStream = (event.streams && event.streams[0]) ? event.streams[0] : new MediaStream([event.track]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play().catch((e) => console.warn('Remote video play warning:', e));
            remoteStream.getAudioTracks().forEach((t) => (t.enabled = true));
          }
          setCallState('connected');
          stopRingtoneSound();
        };

        // Listen for ICE candidates
        peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('ice_candidate', { to: 'admin', candidate: event.candidate });
          }
        };

        // Outbound call to Admin
        if (!isIncoming) {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit('call_user', {
            userToCall: 'admin',
            signalData: offer,
            from:       user.id || user._id,
            name:       user.name,
          });
        }
      } catch (err) {
        console.error('Camera/Mic access error', err);
        setCallState('ended');
        stopRingtoneSound();
      }
    };

    startCall();

    /* ── Socket listeners ── */
    socket.on('call_accepted', async (signal) => {
      if (peerRef.current) {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
        await flushIceCandidates();
        setCallState('connected');
        stopRingtoneSound();
      }
    });

    socket.on('user_busy', () => {
      setCallState('busy');
      stopRingtoneSound();
    });

    socket.on('ice_candidate', async (candidate) => {
      if (candidate) {
        if (peerRef.current && peerRef.current.remoteDescription && peerRef.current.remoteDescription.type) {
          try {
            await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (e) {
            console.error('Error adding ICE candidate directly', e);
          }
        } else {
          pendingCandidatesRef.current.push(candidate);
        }
      }
    });

    socket.on('call_ended', () => {
      endCall();
    });

    return () => {
      mounted = false;
      stopRingtoneSound();
      cleanup();
    };
  }, [isOpen, isIncoming, user]);

  /* ── Accept incoming call ── */
  const acceptCall = async () => {
    stopRingtoneSound();
    if (!peerRef.current || !incomingSignal) return;
    try {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(incomingSignal));
      await flushIceCandidates();
      const answer = await peerRef.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socket.emit('answer_call', { to: 'admin', signal: answer });
      setCallState('connected');
    } catch (err) {
      console.error('Error accepting call', err);
    }
  };

  /* ── Cleanup ── */
  const cleanup = () => {
    stopRingtoneSound();
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }
  };

  const endCall = () => {
    stopRingtoneSound();
    socket.emit('end_call', { to: 'admin' });
    cleanup();
    setCallState('ended');
    setTimeout(onClose, 500);
  };

  /* ── Controls ── */
  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !micOn;
        setMicOn(!micOn);
      }
    }
  };

  const toggleCam = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !camOn;
        setCamOn(!camOn);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
      >
        {/* macOS Window */}
        <div className={`relative w-full overflow-hidden rounded-3xl bg-[#0a0a0a]/90 border border-white/10 shadow-2xl shadow-black/80 flex flex-col transition-all duration-300 ${
          isFullscreen ? 'h-full max-w-none' : 'max-w-4xl h-[75vh] min-h-[500px]'
        }`}>

          {/* macOS Titlebar */}
          <div className="flex-shrink-0 px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={endCall} className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-gray-400 ml-2 font-mono">
                WebRTC P2P Video Meeting · {user.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Shield size={10} /> End-to-End Encrypted
              </span>
              <button
                onClick={() => setFullscreen(!isFullscreen)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>

          {/* Main Video Viewport */}
          <div className="relative flex-1 bg-[#030303] overflow-hidden flex items-center justify-center">

            {/* Remote Video Stream */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Placeholder if remote not connected yet */}
            {callState !== 'connected' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#030303]">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-orange-500/25 animate-pulse">
                  {user.name[0]}
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{user.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {callState === 'calling' && 'Connecting WebRTC P2P Video Call...'}
                    {callState === 'incoming' && 'Incoming Video Call...'}
                    {callState === 'busy' && '⚠️ User is currently busy on another video call. Please try again later.'}
                    {callState === 'ended' && 'Call Ended'}
                  </p>
                </div>

                {callState === 'incoming' && (
                  <button
                    onClick={acceptCall}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all"
                  >
                    Accept Call
                  </button>
                )}
              </div>
            )}

            {/* Local PIP Video */}
            <div className="absolute bottom-16 right-3 sm:bottom-6 sm:right-6 w-28 h-20 sm:w-44 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-zinc-900 z-10">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover transform -scale-x-100"
              />
              {!camOn && (
                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center text-gray-500">
                  <User size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex-shrink-0 py-4 px-6 bg-white/5 border-t border-white/10 flex items-center justify-center gap-4">
            <button
              onClick={toggleMic}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                micOn
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              }`}
              title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              onClick={toggleCam}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                camOn
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              }`}
              title={camOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {camOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button
              onClick={endCall}
              className="w-14 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-all cursor-pointer"
              title="End Video Call"
            >
              <PhoneOff size={22} />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoCallModal;
