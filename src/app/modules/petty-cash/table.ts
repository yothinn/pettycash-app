export class Pc {
  [x: string]: any;

  public total: any;
  public total1: any;
  private deposit = 100;
  private withDraw = 120;
  private status: any;
  public sumIn: any;
  public sumOut: any;
  public table: any;
  public totalResult: number = 0;
  public totalAmountIn: number = 0;
  public totalAmountOut: number = 0;

  constructor() {
  }

  set A(data){
    this.status = data;
  }

  set tab(data) {
    this.table = data;
  }

  findSum() {
    this.totalAmountIn = 0;
    this.totalAmountOut = 0;

    this.sumIn = this.table.data.filter(res => {
      return res.status === 'เงินเข้า';
    })

    this.sumOut = this.table.data.filter(res => {
      return res.status === 'เงินออก';
    })

    this.sumIn.map(item => {
      this.totalAmountIn += item.amount;
    });
    this.sumOut.map(item => {
      this.totalAmountOut += item.amount;
    });

    return this.totalResult = this.totalAmountIn - this.totalAmountOut;
  }

}