const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  onClick,
  href,
  ...props 
}) => {
  const classes = `button button-${variant} button-${size} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button