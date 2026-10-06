import { motion } from "framer-motion";

export default function AnimatedText({ text, className = "", delay = 0, stagger = 0.05, as: Tag = "span" }) {
  const words = text.split(" ");

  return (
    <Tag className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.9,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Tag>
  );
}
