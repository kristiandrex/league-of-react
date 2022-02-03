/**
 *
 * @param {{show: boolean, theme: string}} props
 * @returns
 */
function BadgeNew({ show, theme }) {
  if (!show) {
    return null;
  }

  return (
    <span className="badge" style={{ backgroundColor: theme }}>
      NEW
    </span>
  );
}

export default BadgeNew;
