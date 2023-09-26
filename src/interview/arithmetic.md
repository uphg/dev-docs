# 算法押题

## 选择排序

遍历数组，每次找到当前数组中最小值，放到新数组中，直到数组内没有值

```tsx
function selectionSort(array) {
  let index = -1
  const length = array.length - 1
  while (++index < length) {
    const minIndex = findMinIndex(array.slice(index)) + index
    if (index !== minIndex) {
      const temp = array[index]
      array[index] = array[minIndex]
      array[minIndex] = temp
    }
  }

  return array
}

function findMinIndex(array) {
  let index = -1
  let minIndex = 0
  const length = array.length
  while (++index < length) {
    if (array[index] < array[minIndex]) {
      minIndex = index
    }
  }

  return minIndex
}
```

## 快速排序

随机获取数组中的一个值（中间值），遍历数组，用该值与数组的每一项对比，如果比该值大，放在右侧，如果比该值小放在左侧，和该值相同就放在一起。

```tsx
function quickSort(array) {
  if (array.length <= 1) return array

  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  let same = [pivot]
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (item < pivot) {
      left.push(item)
    } else if (item > pivot) {
      right.push(item)
    } else {
      same.push(item)
    }
  }

  return quickSort(left).concat(same, quickSort(right))
}
```

## 归并排序

每次将数组分为两组（直到分为每个都为一个数字时），对这两组数分别进行排序

```tsx
function mergeSort(array) {
  let length = array.length
  if (length <= 1) return array
  const middleIndex = Math.floor(length / 2)
  let left = array.slice(0, middleIndex)
  let right = array.slice(middleIndex)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(a, b) {
  if (a.length === 0) return b
  if (b.length === 0) return a
  return a[0] > b[0] ? [b[0], ...merge(a, b.slice(1))] : [a[0], ...merge(a.slice(1), b)]
}
```

## 大数相加（两数相加）

```js
function add(a, b) {
  const maxLength = Math.max(a.length, b.length)
  let overflw = false
  let result = ''
  for (let i = 0; i <= maxLength; i++) {
    const itemA = a[a.length - i] || '0'
    const itemB = b[b.length - i] || '0'
    let sum = parseInt(itemA) + parseInt(itemB) + (overflow ? 1 : 0)
    overflow = sum >= 10
    sum = overflow ? sum - 10 : sum
    result = sum + result
  }

  return overflow ? '1' + result : result
}
```

## 两数之和

```js
function toSum(numbers, target) {
  const map = {}
  for (let i = 0; i < numbers.length; i++) {
    const item = numbers[i]
    const next = target - item
    if (next in map) {
      return [i, map[next]]
    }
    map[item] = i
  }
}
```

## 无重复最长子串的长度

题目见：[力扣](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)。题解如下：

```js
function lengthOfLongestSubstring(value) {
  const length = value.length
  if (length <= 1) return length
  let [max, p1, p2] = [1, 0, 1]
  while (p2 < length) {
    let sameIndex = -1
    for (let i = p1; i < p2; i++) {
      if (value[i] === value[p2]) {
        sameIndex = i
        break
      }
    }

    let tempMax
    if (sameIndex >= 0) {
      tempMax = p2 - p1
      p1 = sameIndex + 1
    } else {
      tempMax = p2 - p1 + 1
    }
    max = Math.max(tempMax, max)
    p2 += 1
  }

  return max
}
```
