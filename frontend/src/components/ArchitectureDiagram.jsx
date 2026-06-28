function ArchitectureDiagram({ services }) {
  return (
    <div className="diagram-container">
      {services.map((service, index) => (
        <div key={index}>
          <div className="diagram-box">
            {service}
          </div>

          {index !== services.length - 1 && (
            <div className="arrow">↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ArchitectureDiagram;