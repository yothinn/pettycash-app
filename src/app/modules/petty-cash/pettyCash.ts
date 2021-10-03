export class PettyCash {
  public status: string;
  public amount: number;
  private sumIn: any;
  private sumOut: any;
  public sumData: any;
  private totalAmountIn: number;
  private totalAmountOut: number;
  public totalResult: number;

  constructor() {
  }

  get amountIn(): number {
    if (this.status === 'เงินเข้า') {
      return this.amount;
    } else {
      return 0;
    }
  }

  get amountOut(): number {
    if (this.status === 'เงินออก') {
      return this.amount;
    } else {
      return 0;
    }
  }


  set tab(data) {
    this.sumData = data;
  }

  findSum() {
    this.totalAmountIn = 0;
    this.totalAmountOut = 0;

    this.sumIn = this.sumData.filter(res => {
      return res.status === 'เงินเข้า';
    })

    this.sumOut = this.sumData.filter(res => {
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