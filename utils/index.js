import Thumbnail from "@/components/Thumbnail";

/**
 *
 * @param {Array<IChampion>} array
 * @param {number} size
 */

export function chunckChampions(array, size) {
  const elements = [];

  for (let i = 0; i < size; i++) {
    if (i >= array.length) {
      break;
    }

    const champion = array[i];
    elements.push(<Thumbnail key={champion.id} champion={champion} />);
  }

  return elements;
}

/**
 *
 * @param {Element} element
 */
export function getColumnCount(element) {
  const styles = window.getComputedStyle(element);
  const count = styles
    .getPropertyValue("grid-template-columns")
    .split(" ").length;

  return count || 0;
}
