export class Pc {
    [x: string]: any;

    public deposit = 'เงินเข้า';
    public withDraw = 'เงินออก';
    public total: any;
    public amount = 0;
    public status: any;
    public summ: number = 0;
    public table: any;
    public totalResult: number = 0;
    public totalAmountIn: number = 0;
    public totalAmountOut: number = 0;

    constructor() {
    }

    // set tab(data: any) {
    //     this.table = data;
    // }

    findSum(data){
        this.totalAmountIn = 0;
        this.totalAmountOut = 0;
    
        let sumIn = data.data.filter(res => {
          return res.status === this.deposit;
        })
    
        let sumOut = data.data.filter(res => {
          return res.status === this.withDraw;
        })
    
        sumIn.map(item => {
          this.totalAmountIn += item.amount;
        });
        sumOut.map(item => {
          this.totalAmountOut += item.amount;
        });
    
        return this.totalResult = this.totalAmountIn - this.totalAmountOut;
    }

}