export interface IProduct {
    id: number
    name: string
    description: string
    newPrice: number
    oldPrice: number
    pictures: IPicture[]
    categoryName: string
  }
  
  export interface IPicture {
    imageName: string
    productId: number
  }
  