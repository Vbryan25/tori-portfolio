import { motion, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: 'word' | 'char';
}

export function TextReveal({ text, className = '', delay = 0, stagger = 0.06, splitBy = 'word' }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const pieces = splitBy === 'char' ? Array.from(text) : text.split(' ');

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {pieces.map((piece, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.65, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {piece}
            </motion.span>
          </span>
          {splitBy === 'word' && i < pieces.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
