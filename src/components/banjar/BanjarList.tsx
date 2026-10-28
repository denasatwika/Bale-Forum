type BanjarListProps = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

function BanjarList({ categories, selected, onSelect }: BanjarListProps) {
  return (
    <div className="banjar-list" role="group" aria-label="Filter banjar">
      {['', ...categories].map((category) => (
        <button
          key={category || 'semua'}
          type="button"
          className={`banjar-chip ${selected === category ? 'banjar-chip--active' : ''}`}
          aria-pressed={selected === category}
          onClick={() => onSelect(selected === category ? '' : category)}
        >
          {category ? `#${category}` : 'Semua banjar'}
        </button>
      ))}
    </div>
  );
}

export default BanjarList;