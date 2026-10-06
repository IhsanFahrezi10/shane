import { motion } from "framer-motion";
import { SiReact, SiVuedotjs, SiPhp, SiMysql, SiTailwindcss, SiJavascript, SiGit, SiNodedotjs } from "react-icons/si";

// `blur` = tingkat kekaburan (px). 0 = tajam, makin gede makin blur.
const icons = [
  { Icon: SiReact, top: "8%", left: "6%", size: 180, delay: 0, dur: 22, blur: 4 },
  { Icon: SiVuedotjs, top: "42%", left: "2%", size: 140, delay: 3, dur: 26, blur: 10 },
  { Icon: SiPhp, top: "78%", left: "10%", size: 160, delay: 6, dur: 24, blur: 2 },
  { Icon: SiMysql, top: "22%", left: "82%", size: 150, delay: 2, dur: 28, blur: 6 },
  { Icon: SiTailwindcss, top: "60%", left: "88%", size: 170, delay: 5, dur: 25, blur: 12 },
  { Icon: SiJavascript, top: "88%", left: "72%", size: 130, delay: 8, dur: 30, blur: 3 },
  { Icon: SiGit, top: "50%", left: "48%", size: 120, delay: 4, dur: 27, blur: 8 },
  { Icon: SiNodedotjs, top: "95%", left: "40%", size: 140, delay: 7, dur: 23, blur: 14 },
];

export default function FloatingIcons() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07] dark:opacity-[0.11] text-black dark:text-white">
      {icons.map(({ Icon, top, left, size, delay, dur, blur }, i) => (
        <motion.div key={i} className="absolute" style={{ top, left }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 + i * 0.3, duration: 1.5 }}>
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 12, -8, 0],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            style={{
              filter: `blur(${blur}px)`,
            }}
          >
            <Icon size={size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
