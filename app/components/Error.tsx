function Error({title} : {title: string}) {
  return (
    <div className="error-message-wrapper">
      <p className="error-message">{title}</p>
    </div>
  );
}
export default Error