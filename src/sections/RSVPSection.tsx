import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, Send, User, Mail, Users, MessageSquare } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import type { ReactNode } from 'react';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  attendance: z.string().min(1, 'Please select attendance'),
  guests: z.string().min(1, 'Please select number of guests'),
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
    <div className="space-y-1">
      <label className="flex items-center gap-2 font-inter text-xs tracking-[0.15em] uppercase text-[#72646A]">
        <span className="text-[#E9A5B3]">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-inter text-xs text-[#C8748A]"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass =
  'w-full bg-white/60 border border-[#F5C6D0] rounded-2xl px-4 py-3 font-inter text-sm text-[#2F2430] placeholder-[#72646A]/50 focus:outline-none focus:border-[#E9A5B3] focus:ring-2 focus:ring-[#E9A5B3]/20 transition-all duration-300';

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
    await new Promise((r) => setTimeout(r, 1500));
    console.log('RSVP submitted:', data);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#2F2430]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(233,165,179,0.08),transparent)]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <SectionTitle
          eyebrow="Join Our Celebration"
          title="RSVP"
          titleItalic="Now"
          subtitle="Please let us know you're coming by August 1, 2026"
          light
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_40px_rgba(233,165,179,0.5)]"
              >
                <CheckCircle size={36} className="text-white" />
              </motion.div>
              <h3 className="font-playfair text-3xl text-white font-semibold mb-3">
                We Can't Wait to See You!
              </h3>
              <p className="font-cormorant text-xl text-[#F5C6D0] italic">
                Your RSVP has been received. We'll be in touch soon with more details.
              </p>
              <div className="flex justify-center gap-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Heart size={16} className="text-[#E9A5B3] fill-[#E9A5B3]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-3xl p-6 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Your Name" error={errors.name?.message} icon={<User size={12} />}>
                  <input {...register('name')} placeholder="Full Name" className={inputClass} />
                </InputField>
                <InputField label="Email Address" error={errors.email?.message} icon={<Mail size={12} />}>
                  <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
                </InputField>
              </div>

              <InputField label="Will you attend?" error={errors.attendance?.message} icon={<Heart size={12} />}>
                <div className="flex flex-col sm:flex-row gap-3">
                  {[
                    { value: 'yes', label: 'Joyfully Accept' },
                    { value: 'no', label: 'Regretfully Decline' },
                    { value: 'maybe', label: 'Maybe' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex-1 cursor-pointer">
                      <input {...register('attendance')} type="radio" value={opt.value} className="sr-only peer" />
                      <div className="text-center py-3 px-2 rounded-2xl border border-[#F5C6D0] text-xs font-inter text-[#72646A] peer-checked:bg-gradient-to-r peer-checked:from-[#E9A5B3] peer-checked:to-[#D9A06F] peer-checked:text-white peer-checked:border-transparent transition-all duration-300 hover:border-[#E9A5B3] cursor-pointer">
                        {opt.label}
                      </div>
                    </label>
                  ))}
                </div>
              </InputField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Number of Guests" error={errors.guests?.message} icon={<Users size={12} />}>
                  <select {...register('guests')} className={inputClass}>
                    <option value="">Select guests</option>
                    <option value="1">Just me (1)</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </InputField>
                <InputField label="Dietary Requirements" icon={<MessageSquare size={12} />}>
                  <input {...register('dietary')} placeholder="Any dietary needs?" className={inputClass} />
                </InputField>
              </div>

              <InputField label="A Message for the Couple" icon={<Heart size={12} />}>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Share your wishes with Hashan & Nirasha..."
                  className={`${inputClass} resize-none`}
                />
              </InputField>

              <Button type="submit" size="lg" className="w-full justify-center" disabled={isSubmitting}>
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={14} />
                    Send My RSVP
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
