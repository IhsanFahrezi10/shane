import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { profile } from "../data/profile";
import Reveal from "./ui/Reveal";
import AnimatedText from "./ui/AnimatedText";
import Magnetic from "./ui/Magnetic";

export default function Contact() {
  const { socials } = profile;
  const items = [
    { icon: FiGithub, label: "GitHub", href: socials.github },
    { icon: FiLinkedin, label: "LinkedIn", href: socials.linkedin },
    { icon: FiInstagram, label: "Instagram", href: socials.instagram },
    { icon: FiMail, label: "Email", href: socials.email },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-display text-5xl md:text-7xl mb-6">
          <AnimatedText text="Let's" />{" "}
          <span className="text-outline">
            <AnimatedText text="Talk" delay={0.2} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="text-neutral-600 dark:text-neutral-400 mb-10">Feel free to reach out to me if you have any questions</p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4">
          {items.map(({ icon: Icon, label, href }, i) => (
            <Reveal key={label} delay={0.3 + i * 0.08}>
              <Magnetic strength={0.3}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium"
                  whileHover={{
                    backgroundColor: "#FACC15",
                    color: "#0a0a0a",
                    borderColor: "#FACC15",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={18} /> {label}
                </motion.a>
              </Magnetic>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
