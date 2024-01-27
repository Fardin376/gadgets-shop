function FormWrap({children}: {children: React.ReactNode}) {
  return (
    <div className="formWrapComp-wrapper">
        <div className="formWrap-content">
            {children}
        </div>
    </div>
  )
}
export default FormWrap