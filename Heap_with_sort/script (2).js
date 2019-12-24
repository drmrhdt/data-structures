//(i + 1) * 2 - 1
//(i + 1) * 2

class MinHeap {
    constructor(selector) {
        this.items = [];
        this.selector = selector;
    }

    seek() { return this.items[0]; }

    push(item) {//добавление 
        let i = this.items.length;
        this.items.push(item);
        while (i > 0 && this.selector(this.items[Math.floor((i + 1) / 2 - 1)]) > this.selector(this.items[i])) {//сравнение с родительским элементом
            let t = this.items[i];//ищем минимальный - поднимаем вверх
            this.items[i] = this.items[Math.floor((i+1)/2-1)];
            this.items[Math.floor((i+1)/2-1)] = t;
            i = Math.floor((i + 1) / 2 - 1);
        }
    }


    delete(item) {//удаление
        let i = this.items.indexOf(item);
        // heapify
        this.items[i] = this.items.pop();
        while (true) {
            let lowest = this.selector(this.items[(i + 1) * 2]) < this.selector(this.items[(i + 1) * 2 - 1]) 
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {//если есть дети, то упорядочеваем
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest             
            } else break;
        }
    }

    heapify(arr) {//проход по входным данным
        for (let i = 0; i < arr.length; i++) {
            this.push(arr[i]);
        }
    }
}
//ПИРАМИДАЛЬНАЯ СОРТИРОВКА
var array_length;
/* to create MAX  array */  
function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {//переставляем
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input) {
    var time = performance.now();
    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {//выбираем корень 
        heap_root(input, i);
      }

    for (i = input.length - 1; i > 0; i--) {//переставляем
        swap(input, 0, i);
        array_length--;
      
      
        heap_root(input, 0);//удаляем
    }
    time = performance.now() - time;
document.getElementById('time').innerHTML='Время выполнения = ' +time;
}









const heap = new MinHeap(x => x);
heap.heapify([1, 0, 4, 6, 5, 9, 7, 2, 3, 8]);


const posy = i => Math.floor(Math.log2(i+1)) * 50 + 20;

const posx = i => {
  const level = Math.floor(Math.log2(i+1));
  const len = Math.pow(2, level);
  const j = i - len + 2;
  const k = j / (len + 1) - .5;
  const x = k * 600 + 300;
  return x;
}

const visualize = (ctx, arr) => {
  ctx.strokeStyle = "#FF0000";
  ctx.font = "14px Arial";
  ctx.clearRect(0, 0, 600, 600);
  for (let i = 0; i < arr.length; i++) {
    ctx.beginPath();
    ctx.moveTo(posx(i), posy(i));
    const j = Math.floor((i + 1) / 2 - 1);
    ctx.lineTo(posx(j), posy(j));
    ctx.stroke();
  }
  for (let i = 0; i < arr.length; i++) {
    ctx.beginPath();
    ctx.arc(posx(i), posy(i), 12, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#99ff99";
    ctx.fill();
    ctx.fillStyle = "#000000";
    //console.log(posx(i), posy(i))
    ctx.fillText(arr[i], posx(i) - 4, posy(i) + 4);
  }
};



const ctx = document.getElementById('heap-visualization').getContext('2d');
visualize(ctx, heap.items);

document.getElementById('push').addEventListener('click', function() {
  var val = +document.getElementById('val').value;
  if (isNaN(val)) return alert('Value is not a number');
  heap.push(val);
  heapSort(heap.items);
  document.getElementById('result').innerHTML=heap.items;
  visualize(ctx, heap.items);
}); 


document.getElementById('del').addEventListener('click', function() {
    var val = +document.getElementById('val').value;
    if (isNaN(val)) return alert('Value is not a number');
    heap.delete(val);
    heapSort(heap.items);
  document.getElementById('result').innerHTML=heap.items;
    visualize(ctx, heap.items);
  }); 





