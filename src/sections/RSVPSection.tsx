import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, User, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { addRSVPEntry } from '../services/excelService';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  attendance: z.string().min(1, 'Please select your attendance'),
  dietary: z.string().optional(),
  message: z.string().optional(),
});

type RSVPForm = z.infer<typeof rsvpSchema>;

function InputField({
  label,
  error,
  icon,
  children,
}: {
  label: string;
  error?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2.5 font-inter text-xs tracking-[0.15em] uppercase text-[#72646A]">
        <span className="text-[#E9A5B3]" aria-hidden="true">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-inter text-xs text-[#C8748A] pl-1"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass =
  'w-full h-14 bg-white/70 border border-[#E9A5B3]/25 rounded-2xl px-5 font-inter text-[15px] text-[#2F2430] placeholder:text-[#72646A]/40 focus:outline-none focus:border-[#E9A5B3] focus:ring-4 focus:ring-[#E9A5B3]/15 hover:border-[#E9A5B3]/50 transition-all duration-300';

const textareaClass =
  'w-full bg-white/70 border border-[#E9A5B3]/25 rounded-2xl px-5 py-4 font-inter text-[15px] text-[#2F2430] placeholder:text-[#72646A]/40 focus:outline-none focus:border-[#E9A5B3] focus:ring-4 focus:ring-[#E9A5B3]/15 hover:border-[#E9A5B3]/50 transition-all duration-300 resize-none min-h-[120px]';

function RoseDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E9A5B3]/30 to-transparent" />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="3.5" fill="#E9A5B3" opacity="0.6" />
        {[0, 60, 120].map((angle) => (
          <ellipse
            key={angle}
            cx="14"
            cy="14"
            rx="6"
            ry="12"
            fill="#E9A5B3"
            opacity="0.2"
            transform={`rotate(${angle} 14 14)`}
            style={{ transformOrigin: '14px 14px' }}
          />
        ))}
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E9A5B3]/30 to-transparent" />
    </div>
  );
}

function CornerFlower({ className }: { className: string }) {
  return (
    <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="4" fill="#E9A5B3" opacity="0.5" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="40"
          cy="40"
          rx="7"
          ry="18"
          fill="#E9A5B3"
          opacity="0.12"
          transform={`rotate(${angle} 40 40)`}
          style={{ transformOrigin: '40px 40px' }}
        />
      ))}
    </svg>
  );
}

function GroupHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E9A5B3]/20 to-[#D9A06F]/20 flex items-center justify-center text-[#C8748A]">
        {icon}
      </div>
      <h3 className="font-playfair text-xl text-[#2F2430] font-semibold">{title}</h3>
      <div className="flex-1 h-px bg-gradient-to-r from-[#E9A5B3]/20 to-transparent" />
    </div>
  );
}

export function RSVPSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RSVPForm>({
    resolver: zodResolver(rsvpSchema),
  });

  const onSubmit = async (data: RSVPForm) => {
    await new Promise((r) => setTimeout(r, 2000));
    addRSVPEntry(data);
    setSubmitted(true);
  };

  const floatingHearts = [...Array(6)];

  return (
    <section id="rsvp" className="section-padding relative overflow-hidden bg-[#2F2430]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(233,165,179,0.1),transparent)]" />

      {/* Floating decorative hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingHearts.map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 14}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0, 10, 0],
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i * 0.8,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart size={14 + i * 2} className="text-[#E9A5B3]" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#E9A5B3] mb-5">
            Join Our Celebration
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            We Can't Wait To{' '}
            <em className="italic text-gradient-rose">Celebrate</em>
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-[#F5C6D0] italic mt-4 max-readable mx-auto">
            with Hashan & Nirasha
          </p>
          <p className="font-inter text-sm text-[#72646A] mt-4">
            Kindly confirm your attendance before{' '}
            <span className="text-[#E9A5B3] font-medium">August 1, 2026</span>
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                className="relative rounded-[32px] bg-white/90 backdrop-blur-xl border border-[#E9A5B3]/20 shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-10 sm:p-14 lg:p-16 text-center overflow-hidden"
              >
                {/* Corner decorations */}
                <CornerFlower className="absolute -top-6 -left-6 opacity-60" />
                <CornerFlower className="absolute -bottom-6 -right-6 opacity-60 rotate-180" />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center mx-auto mb-8 shadow-[0_8px_40px_rgba(233,165,179,0.5)]"
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-playfair text-3xl sm:text-4xl text-[#2F2430] font-semibold mb-4"
                >
                  We Can't Wait to See You!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="font-cormorant text-xl sm:text-2xl text-[#72646A] italic max-readable mx-auto"
                >
                  Your RSVP has been received with love. We'll share more details as the day draws closer.
                </motion.p>

                <RoseDivider />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center gap-3"
                >
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -12, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.12,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                      }}
                    >
                      <Heart
                        size={i === 3 ? 24 : 14}
                        className="text-[#E9A5B3] fill-[#E9A5B3]"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                onSubmit={handleSubmit(onSubmit)}
                className="relative rounded-[32px] bg-white/90 backdrop-blur-xl border border-[#E9A5B3]/20 shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-8 sm:p-10 lg:p-12 overflow-hidden"
              >
                {/* Corner decorations */}
                <CornerFlower className="absolute -top-6 -left-6 opacity-40" />
                <CornerFlower className="absolute -bottom-6 -right-6 opacity-40 rotate-180" />

                {/* Inner decorative top accent */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#E9A5B3]/50 to-transparent rounded-full" />

                {/* Guest Information */}
                <div className="mb-10">
                  <GroupHeader icon={<User size={14} />} title="Guest Information" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    <InputField label="Full Name" error={errors.name?.message} icon={<User size={12} />}>
                      <input
                        {...register('name')}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </InputField>
                    <InputField label="Email Address" error={errors.email?.message} icon={<Mail size={12} />}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </InputField>
                  </div>
                  <div className="mt-5 md:mt-8">
                    <InputField label="Phone Number (Optional)" icon={<Phone size={12} />}>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+94 XXX XXX XXX"
                        className={inputClass}
                      />
                    </InputField>
                  </div>
                </div>

                {/* Rose Divider */}
                <RoseDivider />

                {/* Attendance */}
                <div className="mb-10">
                  <GroupHeader icon={<Heart size={14} />} title="Attendance" />
                  <InputField label="Will you attend?" error={errors.attendance?.message} icon={<Heart size={12} />}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: 'yes', label: 'Joyfully Accept' },
                        { value: 'maybe', label: 'Will Let You Know' },
                        { value: 'no', label: 'Regretfully Decline' },
                      ].map((opt) => (
                        <label key={opt.value} className="cursor-pointer group">
                          <input
                            {...register('attendance')}
                            type="radio"
                            value={opt.value}
                            className="sr-only peer"
                          />
                          <div className="relative h-12 flex items-center justify-center px-4 rounded-2xl border border-[#E9A5B3]/25 bg-white/50 text-sm font-inter text-[#72646A] peer-checked:bg-gradient-to-r peer-checked:from-[#E9A5B3] peer-checked:to-[#D9A06F] peer-checked:text-white peer-checked:border-transparent peer-checked:shadow-[0_4px_20px_rgba(233,165,179,0.35)] hover:border-[#E9A5B3]/60 transition-all duration-300 group-hover:shadow-[0_4px_15px_rgba(233,165,179,0.15)]">
                            {opt.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </InputField>
                </div>

                {/* Rose Divider */}
                <RoseDivider />

                {/* Special Requests */}
                <div className="mb-10">
                  <GroupHeader icon={<MessageSquare size={14} />} title="Special Requests" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    <InputField label="Dietary Requirements" icon={<MessageSquare size={12} />}>
                      <input
                        {...register('dietary')}
                        placeholder="Any dietary needs?"
                        className={inputClass}
                      />
                    </InputField>
                    <InputField label="A Message for the Couple" icon={<Heart size={12} />}>
                      <textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Share your wishes..."
                        className={textareaClass}
                      />
                    </InputField>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.02, boxShadow: '0 12px 40px rgba(233,165,179,0.5)' }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  className="relative w-full h-14 bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white font-inter text-sm tracking-widest uppercase rounded-full shadow-[0_8px_30px_rgba(233,165,179,0.35)] hover:shadow-[0_12px_45px_rgba(233,165,179,0.5)] transition-shadow duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group"
                >
                  {/* Shimmer overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />

                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Reserve My Seat</span>
                      <Heart size={14} className="fill-white" />
                    </>
                  )}
                </motion.button>

                <p className="text-center mt-5 font-cormorant text-base text-[#72646A] italic">
                  We can't wait to celebrate with you
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
