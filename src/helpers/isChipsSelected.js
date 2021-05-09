const isChipsSelected = (selection, chipsPosition) => {
  console.log('isChipsSelected');
  if (!chipsPosition) return false;

  const { left, right, top, bottom } = chipsPosition;
  const { xStart, yStart, xEnd, yEnd } = selection;

  // начало выделения ниже чипса
  if (yStart > bottom) {
    if (yEnd > bottom) return false;
    if (yEnd <= bottom && yEnd >= top) return xEnd < right;
    if (yEnd < top) return true;
  }

  // начало выделения внутри чипса (по высоте)
  if (yStart <= bottom && yStart >= top) {
    if (yEnd < top) return xStart > left;
    if (yEnd >= top && yEnd <= bottom) {
      if (xStart > xEnd) return xStart > right && xEnd < right;
      if (xStart <= xEnd) return xEnd > left && xStart < left;
    }
    if (yEnd > bottom) return xStart < right;
  }

  // начало выделения выше чипса
  if (yStart < top) {
    if (yEnd < top) return false;
    if (yEnd >= top && yEnd <= bottom) return xEnd > left;
    if (yEnd > bottom) return true;
  }
};

export default isChipsSelected;
