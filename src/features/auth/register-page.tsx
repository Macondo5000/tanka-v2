import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/store/auth-store';
import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusedField, setFocusedField] = useState<'name' | 'email' | null>(null);
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signIn(email.trim());
    navigate('/', { replace: true });
  };

  const handleOAuth = () => {
    signIn();
    navigate('/', { replace: true });
  };

  const fieldStyle = (field: 'name' | 'email') => ({
    boxShadow:
      focusedField === field
        ? '0 0 0 2px rgba(244,123,32,0.3), 0 1px 3px rgba(0,0,0,0.06)'
        : '0 0 0 1px rgba(0,0,0,0.07)',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EDEAE4] px-4 py-12">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-[400px]"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <span className="text-[13px] font-semibold tracking-[0.18em] uppercase text-gray-400 select-none">
            Tanka
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl px-9 py-9"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)' }}
        >
          <motion.div variants={itemVariants} className="mb-7">
            <h1
              className="text-[28px] font-semibold text-gray-950 text-center leading-tight mb-1.5"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Create account
            </h1>
            <p className="text-[14px] text-gray-400 text-center">
              Join your team on Tanka.
            </p>
          </motion.div>

          {/* Apple */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleOAuth}
              whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.18)' }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#111] text-white text-[14px] font-medium mb-2.5"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </motion.button>
          </motion.div>

          {/* Google */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleOAuth}
              whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(66,133,244,0.28)' }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#4285F4] text-white text-[14px] font-medium mb-6"
              style={{ boxShadow: '0 2px 8px rgba(66,133,244,0.22)' }}
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
              </svg>
              Continue with Google
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[12px] text-gray-300 font-medium tracking-wider uppercase">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-2.5">
            <div
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={fieldStyle('name')}
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3.5 bg-gray-50 text-[14px] text-gray-900 placeholder-gray-300 outline-none"
              />
            </div>
            <div
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={fieldStyle('email')}
            >
              <input
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3.5 bg-gray-50 text-[14px] text-gray-900 placeholder-gray-300 outline-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(244,123,32,0.32)' }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
              className="w-full px-4 py-3.5 rounded-xl bg-[#F47B20] text-white text-[14px] font-medium"
              style={{ boxShadow: '0 2px 8px rgba(244,123,32,0.22)' }}
            >
              Create account
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Below card */}
        <motion.div variants={itemVariants} className="mt-6 text-center space-y-3">
          <p className="text-[13px] text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-gray-700 font-semibold underline underline-offset-2 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-[12px] text-gray-300">
            <a href="#" className="hover:text-gray-500 transition-colors">Help</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
