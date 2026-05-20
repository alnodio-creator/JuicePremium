'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border-t border-white/10 mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div custom={0} variants={footerVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">
                F
              </div>
              <div>
                <p className="font-bold text-lg bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  {SITE_NAME}
                </p>
                <p className="text-xs text-muted-foreground">{SITE_TAGLINE}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium cold-pressed juices crafted for optimal health and vitality.
            </p>
          </motion.div>

          {/* Products */}
          <motion.div custom={1} variants={footerVariants} className="space-y-4">
            <h3 className="font-semibold text-foreground">Produk</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Detox Collection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Energize Series
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Wellness Line
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Performance Blend
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div custom={2} variants={footerVariants} className="space-y-4">
            <h3 className="font-semibold text-foreground">Perusahaan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div custom={3} variants={footerVariants} className="space-y-4">
            <h3 className="font-semibold text-foreground">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a href="mailto:hello@freshboost.com" className="hover:text-primary transition-colors">
                  hello@freshboost.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <a href="tel:+62123456789" className="hover:text-primary transition-colors">
                  +62 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent my-8 origin-left"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
        >
          <p>&copy; {currentYear} {SITE_NAME}. All rights reserved.</p>
          <p>Crafted with care for your health and wellness.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
