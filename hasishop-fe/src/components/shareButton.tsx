import { Button } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";

export interface ShareButtonProps {
  url: string;
  text: string;
  title: string;
}

function ShareButton({url, title, text } : ShareButtonProps ) {
  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const shareData = {
      title: title,
      text: text,
      url: url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <Button onClick={handleShare} rightSection={<IconShare size={14} />}>
      Share
    </Button>
  );
};

export default ShareButton;
