import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLinks = [
  { name: "Facebook", href: 'https://www.facebook.com', icon: <Facebook className="w-5 h-5" /> },
  { name: "Twitter", href: 'https://www.twitter.com', icon: <Twitter className="w-5 h-5" /> },
  { name: "Instagram", href: 'https://www.instagram.com', icon: <Instagram className="w-5 h-5" /> },
  { name: "LinkedIn", href: 'https://www.linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
  { name: "GitHub", href: 'https://www.github.com', icon: <Github className="w-5 h-5" /> },
  { name: "Youtube", href: 'https://www.youtube.com', icon: <Youtube className="w-5 h-5" /> },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      {/**tooltipProvider est notre conteneur principal */}
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLinks?.map((item) => (
          <Tooltip key={item?.name}>
            <TooltipTrigger asChild>
              {/**as child transfer les propriétés tooltip au Link */}
              <Link 
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 rounded-full hover:text-white hoverEffect border hover:border-white", 
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent 
              className={cn("bg-white text-darkColor font-semibold", tooltipClassName)}
            >
              {item?.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;

/**
 * Composant qui affiche les liens des réseaux sociaux avec des tooltips
 * Utilise Radix UI pour l'accessibilité automatique
 * 
 * @param className - Classes CSS pour le conteneur principal
 * @param iconClassName - Classes CSS pour chaque lien/icône  
 * @param tooltipClassName - Classes CSS pour le contenu des tooltips
 */
