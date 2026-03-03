"use client";

import { Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Optional: if you use Sonner for notifications

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Check out this property on Ground Link: ${title}`,
      url: window.location.href,
    };

    try {
      // Check if the browser supports native sharing (Mobile/Safari)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for Desktop: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!"); 
        // Better: toast.success("Link copied to clipboard!")
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleShare}
      className="text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest gap-2"
    >
      <Share2 className="h-4 w-4" /> Share with someone
    </Button>
  );
}