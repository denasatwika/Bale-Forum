type AvatarProps = {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: 28,
  md: 44,
  lg: 64,
};

function Avatar({ src, name, size = 'md' }: AvatarProps) {
  return (
    <img
      className="avatar rounded-circle flex-shrink-0"
      src={src}
      alt={`Avatar ${name}`}
      width={sizes[size]}
      height={sizes[size]}
    />
  );
}

export default Avatar;
