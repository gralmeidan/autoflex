export default interface IProduct {
  id: number;
  name: string;
  value: number;
  craftable?: number;
  subtotal?: number;
  materials?: {
    id: number;
    name: number;
    quantity: number;
    info: {
      quantity: number;
    };
  }[];
}
