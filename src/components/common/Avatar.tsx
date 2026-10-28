type AvatarProps = {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

function Avatar({ src, name, size = 'md' }: AvatarProps) {
  return <img className={`avatar avatar--${size}`} src={src} alt={`Avatar ${name}`} />;
}

export default Avatar;