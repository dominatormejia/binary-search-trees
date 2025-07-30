export const test = "testing merge connection";

export class MergeSort {
  sort(array) {
    if (array.length < 2) {
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const leftArray = array.slice(0, mid);
    const rightArray = array.slice(mid);

    const sortedLeft = this.sort(leftArray);
    const sortedRight = this.sort(rightArray);

    return this.merge(sortedLeft, sortedRight);
  }

  merge(left, right) {
    let i = 0;
    let j = 0;
    const mergeArray = [];

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        mergeArray.push(left[i++]);
      } else {
        mergeArray.push(right[j++]);
      }
    }

    for (; i < left.length; i++) {
      mergeArray.push(left[i]);
    }
    for (; j < right.length; j++) {
      mergeArray.push(right[j]);
    }
    return mergeArray;
  }
}
