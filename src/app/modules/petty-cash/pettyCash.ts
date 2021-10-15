export class PettyCash {
  public status: string;
  public amount: number;
  public employeeId: string;
  // private sumIn: any;
  // private sumOut: any;
  public sumData: any;
  public testIn: any;
  public testOut: any;
  // public sumIn: any;
  // public sumOut: any;
  // public a: any [];
  // public b: any;
  // private totalAmountIn: number;
  // private totalAmountOut: number;
  public totalResult: number;
  public a: any;
  public b: any;



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


  // get net(): number {
  //   return this.testIn.total
  // }

  // set tab(data) {
  //   this.sumData = data;
  // }
  // set test1(data) {
  //   this.testIn = data;
  // }

  // set test2(data) {
  //   this.testOut = data;
  // }

  // get testSum():any{
  //   let a  = this.testIn.testAmountIn.filter(res=>{
  //     return res._id;
  //   })
  //   let ab = a.map(res=> res.total)
  //   return ab
  // }
  // findSum() {
  //   this.totalAmountIn = 0;
  //   this.totalAmountOut = 0;

  //   this.sumIn = this.sumData.filter(res => {
  //     return res.status === 'เงินเข้า';
  //   })

  //   this.sumOut = this.sumData.filter(res => {
  //     return res.status === 'เงินออก';
  //   })

  //   this.sumIn.map(item => {
  //     this.totalAmountIn += item.amount;
  //   });
  //   this.sumOut.map(item => {
  //     this.totalAmountOut += item.amount;
  //   });

  //   return this.totalResult = this.totalAmountIn - this.totalAmountOut;
  // }

}