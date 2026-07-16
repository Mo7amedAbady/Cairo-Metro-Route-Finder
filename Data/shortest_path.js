class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    left(i) {
        return 2 * i + 1;
    }

    right(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(item) {
        this.heap.push(item);

        let i = this.heap.length - 1;

        while (
            i > 0 &&
            this.heap[this.parent(i)].countTS > this.heap[i].countTS
        ) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();

        let i = 0;

        while (true) {
            let smallest = i;
            let l = this.left(i);
            let r = this.right(i);

            if (
                l < this.heap.length &&
                this.heap[l].countTS < this.heap[smallest].countTS
            ) {
                smallest = l;
            }

            if (
                r < this.heap.length &&
                this.heap[r].countTS < this.heap[smallest].countTS
            ) {
                smallest = r;
            }

            if (smallest === i) break;

            this.swap(i, smallest);
            i = smallest;
        }

        return min;
    }

    peek() {
        return this.heap.length ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

const Stations = [
  { station: 'Helwan',              neighbors: [ 1 ],              color: [ 'L1' ] },
  { station: 'Ain Helwan',          neighbors: [ 0, 2 ],           color: [ 'L1', 'L1' ] },
  { station: 'Helwan University',   neighbors: [ 1, 3 ],           color: [ 'L1', 'L1' ] },
  { station: 'Wadi Hof',            neighbors: [ 2, 4 ],           color: [ 'L1', 'L1' ] },
  { station: 'Hadayeq Helwan',      neighbors: [ 3, 5 ],           color: [ 'L1', 'L1' ] },
  { station: 'El Maasara',          neighbors: [ 4, 6 ],           color: [ 'L1', 'L1' ] },
  { station: 'Tura El Asmant',      neighbors: [ 5, 7 ],           color: [ 'L1', 'L1' ] },
  { station: 'Kozzika',             neighbors: [ 6, 8 ],           color: [ 'L1', 'L1' ] },
  { station: 'Tura El Balad',       neighbors: [ 7, 9 ],           color: [ 'L1', 'L1' ] },
  { station: 'Sakanat El Maadi',    neighbors: [ 8, 10 ],          color: [ 'L1', 'L1' ] },
  { station: 'Maadi',               neighbors: [ 9, 11 ],          color: [ 'L1', 'L1' ] },
  { station: 'Hadayeq El Maadi',    neighbors: [ 10, 12 ],         color: [ 'L1', 'L1' ] },
  { station: 'Dar El Salam',        neighbors: [ 11, 13 ],         color: [ 'L1', 'L1' ] },
  { station: 'El Zahraa',           neighbors: [ 12, 14 ],         color: [ 'L1', 'L1' ] },
  { station: 'Mar Girgis',          neighbors: [ 13, 15 ],         color: [ 'L1', 'L1' ] },
  { station: 'El Malek El Saleh',   neighbors: [ 14, 16 ],         color: [ 'L1', 'L1' ] },
  { station: 'Sayeda Zeinab',       neighbors: [ 15, 17 ],         color: [ 'L1', 'L1' ] },
  { station: 'Saad Zaghloul',       neighbors: [ 16, 80 ],         color: [ 'L1', 'L1' ] },
  { station: 'Orabi',               neighbors: [ 79, 81 ],         color: [ 'L1', 'L1' ] },
  { station: 'Ghamra',              neighbors: [ 20, 79 ],         color: [ 'L1', 'L1' ] },
  { station: 'El Demerdash',        neighbors: [ 19, 21 ],         color: [ 'L1', 'L1' ] },
  { station: 'Manshiet El Sadr',    neighbors: [ 20, 22 ],         color: [ 'L1', 'L1' ] },
  { station: 'Kobri El Qobba',      neighbors: [ 21, 23 ],         color: [ 'L1', 'L1' ] },
  { station: 'Hammamat El Qobba',   neighbors: [ 22, 24 ],         color: [ 'L1', 'L1' ] },
  { station: 'Saray El Qobba',      neighbors: [ 23, 25 ],         color: [ 'L1', 'L1' ] },
  { station: 'Hadayeq El Zaitoun',  neighbors: [ 24, 26 ],         color: [ 'L1', 'L1' ] },
  { station: 'Helmeyet El Zaitoun', neighbors: [ 25, 27 ],         color: [ 'L1', 'L1' ] },
  { station: 'El Matareyya',        neighbors: [ 26, 28 ],         color: [ 'L1', 'L1' ] },
  { station: 'Ain Shams',           neighbors: [ 27, 29 ],         color: [ 'L1', 'L1' ] },
  { station: 'Ezbet El Nakhl',      neighbors: [ 28, 30 ],         color: [ 'L1', 'L1' ] },
  { station: 'El Marg',             neighbors: [ 20, 31 ],         color: [ 'L1', 'L1' ] },
  { station: 'New El Marg',         neighbors: [ 30 ],             color: [ 'L1' ] },
  { station: 'El Moneeb',           neighbors: [ 33 ],             color: [ 'L2' ] },
  { station: 'Sakyat Mekky',        neighbors: [ 32, 34 ],         color: [ 'L2', 'L2' ] },
  { station: 'Om El Masryeen',      neighbors: [ 33, 35 ],         color: [ 'L2', 'L2' ] },
  { station: 'Giza',                neighbors: [ 34, 36 ],         color: [ 'L2', 'L2' ] },
  { station: 'Faisal',              neighbors: [ 35, 83 ],         color: [ 'L2', 'L2' ] },
  { station: 'El Bohouth',          neighbors: [ 38, 83 ],         color: [ 'L2', 'L2' ] },
  { station: 'Dokki',               neighbors: [ 37, 39 ],         color: [ 'L2', 'L2' ] },
  { station: 'Opera',               neighbors: [ 38, 80 ],         color: [ 'L2', 'L2' ] },
  { station: 'Mohamed Naguib',      neighbors: [ 80, 82 ],         color: [ 'L2', 'L2' ] },
  { station: 'Massara',             neighbors: [ 42, 79 ],         color: [ 'L2', 'L2' ] },
  { station: 'Rod El Farag',        neighbors: [ 41, 43 ],         color: [ 'L2', 'L2' ] },
  { station: 'St. Teresa',          neighbors: [ 42, 44 ],         color: [ 'L2', 'L2' ] },
  { station: 'Khalafawy',           neighbors: [ 43, 45 ],         color: [ 'L2', 'L2' ] },
  { station: 'Mezallat',            neighbors: [ 44, 46 ],         color: [ 'L2', 'L2' ] },
  { station: 'Kolleyet El Zeraa',   neighbors: [ 45, 47 ],         color: [ 'L2', 'L2' ] },
  { station: 'Shubra El Kheima',    neighbors: [ 46 ],             color: [ 'L2' ] },
  { station: 'Adly Mansour',        neighbors: [ 49 ],             color: [ 'L3' ] },
  { station: 'El Haykestep',        neighbors: [ 48, 50 ],         color: [ 'L3', 'L3' ] },
  { station: 'Omar Ibn El Khattab', neighbors: [ 49, 51 ],         color: [ 'L3', 'L3' ] },
  { station: 'Qobaa',               neighbors: [ 50, 52 ],         color: [ 'L3', 'L3' ] },
  { station: 'Hisham Barakat',      neighbors: [ 51, 53 ],         color: [ 'L3', 'L3' ] },
  { station: 'El Nozha',            neighbors: [ 52, 54 ],         color: [ 'L3', 'L3' ] },
  { station: 'Nadi El Shams',       neighbors: [ 53, 55 ],         color: [ 'L3', 'L3' ] },
  { station: 'Alf Maskan',          neighbors: [ 54, 56 ],         color: [ 'L3', 'L3' ] },
  { station: 'Heliopolis',          neighbors: [ 55, 57 ],         color: [ 'L3', 'L3' ] },
  { station: 'Haroun',              neighbors: [ 56, 58 ],         color: [ 'L3', 'L3' ] },
  { station: 'Al Ahram',            neighbors: [ 57, 59 ],         color: [ 'L3', 'L3' ] },
  { station: 'Kolleyet El Banat',   neighbors: [ 58, 60 ],         color: [ 'L3', 'L3' ] },
  { station: 'Stadium',             neighbors: [ 59, 61 ],         color: [ 'L3', 'L3' ] },
  { station: 'Fair Zone',           neighbors: [ 60, 62 ],         color: [ 'L3', 'L3' ] },
  { station: 'Abbassia',            neighbors: [ 61, 63 ],         color: [ 'L3', 'L3' ] },
  { station: 'Abdou Pasha',         neighbors: [ 62, 64 ],         color: [ 'L3', 'L3' ] },
  { station: 'El Geish',            neighbors: [ 63, 65 ],         color: [ 'L3', 'L3' ] },
  { station: 'Bab El Sharia',       neighbors: [ 64, 82 ],         color: [ 'L3', 'L3' ] },
  { station: 'Maspero',             neighbors: [ 81, 67 ],         color: [ 'L3', 'L3' ] },
  { station: 'Safaa Hegazy',        neighbors: [ 66, 68 ],         color: [ 'L3', 'L3' ] },
  { station: 'Kit Kat',             neighbors: [ 67, 69, 75 ],     color: [ 'L3', 'L3', 'L3' ] },
  { station: 'Sudan',               neighbors: [ 68, 70 ],         color: [ 'L3', 'L3' ] },
  { station: 'Imbaba',              neighbors: [ 69, 71 ],         color: [ 'L3', 'L3' ] },
  { station: 'El Bohy',             neighbors: [ 70, 72 ],         color: [ 'L3', 'L3' ] },
  { station: 'Al Qawmia',           neighbors: [ 71, 73 ],         color: [ 'L3', 'L3' ] },
  { station: 'Ring Road',           neighbors: [ 72, 74 ],         color: [ 'L3', 'L3' ] },
  { station: 'Rod El Farag Corr.',  neighbors: [ 73 ],             color: [ 'L3' ] },
  { station: 'Tawfikia',            neighbors: [ 68, 76 ],         color: [ 'L3', 'L3' ] },
  { station: 'Wadi El Nil',         neighbors: [ 75, 77 ],         color: [ 'L3', 'L3' ] },
  { station: 'Gamet El Dowal',      neighbors: [ 76, 78 ],         color: [ 'L3', 'L3' ] },
  { station: 'Boulak El Dakrour',   neighbors: [ 77, 83 ],         color: [ 'L3', 'L3' ] },
  { station: 'Al Shohadaa',         neighbors: [ 18, 19, 41, 82 ], color: [ 'L1', 'L1', 'L2', 'L2' ] },
  { station: 'Sadat',               neighbors: [ 17, 39, 40, 81 ], color: [ 'L1', 'L2', 'L2', 'L1' ] },
  { station: 'Nasser',              neighbors: [ 18, 66, 80, 82 ], color: [ 'L1', 'L3', 'L1', 'L3' ] },
  { station: 'Attaba',              neighbors: [ 40, 65, 79, 81 ], color: [ 'L2', 'L3', 'L2', 'L3' ] },
  { station: 'Cairo University',    neighbors: [ 36, 37, 78 ],     color: [ 'L2', 'L2', 'L3' ] }
]

export function BFS (start,end){
    let istart = Stations.findIndex(station => station.station === start);
    let iend = Stations.findIndex(station => station.station === end);
    start = istart;
    end = iend;
    const pq = new MinHeap();
    const dist = new Array(100).fill(1000000);
    let par = [];
    pq.push({Node : start, countTS : 0, color : 'TS'});
    dist[start] = 0;
    while(pq.size()){
        let node = pq.pop();
        if (dist[node.Node] < node.countTS) continue;
        if (node.Node == end) break;

        for (let i = 0; i<Stations[node.Node].neighbors.length; i++) {
            let flagTS = (Stations[node.Node].color[i]!=node.color && node.color!='TS');
            let nd = dist[node.Node] + flagTS;
            if (nd < dist[Stations[node.Node].neighbors[i]]) {
                dist[Stations[node.Node].neighbors[i]] = nd;
                const x = {Node : Stations[node.Node].neighbors[i] , countTS : (node.countTS + flagTS), color : Stations[node.Node].color[i] };
                pq.push(x);
                par[Stations[node.Node].neighbors[i]] = node.Node;
            }
        }
    }
     
    let Bulding = [], x = end;
    while (x != start) {
        Bulding.push( x );
        x = par[x];
    }
    Bulding.push(start);
    Bulding.reverse();
    let F_Bulding = [];
    let end_node;
    for (let i=0;i<Bulding.length-1;i++){
        let line;
        for (let j = 0;j<Stations[Bulding[i]].neighbors.length;j++){
            if (Stations[Bulding[i]].neighbors[j]==Bulding[i+1]){
                line = Stations[Bulding[i]].color[j];
                break;
            }
        }
        let x = {S : Stations[Bulding[i]].station , L : line};
        end_node = {S : Stations[Bulding[Bulding.length-1]].station , L : line};
        F_Bulding.push(x);
    }
    F_Bulding.push(end_node);
    return F_Bulding;
}

export default Stations;
