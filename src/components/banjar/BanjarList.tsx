type BanjarListProps = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

function BanjarList({ categories, selected, onSelect }: BanjarListProps) {
  return (
    <div>
      <p className="small fw-semibold text-uppercase text-body-secondary mb-2" style={{ letterSpacing: '0.08em' }}>
        Saring berdasarkan topik
      </p>
      <div className="d-flex flex-wrap gap-2" role="group" aria-label="Saring berdasarkan topik">
        {['', ...categories].map((category) => {
          const isActive = selected === category;
          return (
            <button
              key={category || 'semua'}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(isActive ? '' : category)}
              className={`btn btn-sm rounded-pill text-capitalize ${isActive ? 'btn-dark' : 'btn-outline-secondary'}`}
            >
              {category || 'Semua topik'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BanjarList;
