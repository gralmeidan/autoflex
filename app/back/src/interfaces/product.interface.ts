export default interface IProduct {
  id: number;
  name: string;
  value: number;
  thumb: string;
  craftable?: number;
  subtotal?: number;
  materials?: {
    id: number;
    thumb: string;
    name: number;
    quantity: number;
    info: {
      quantity: number;
    };
  }[];
}
