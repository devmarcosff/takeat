import { EmblaOptionsType } from "embla-carousel";

export interface IProducts {
  id: string,
  name?: string,
  description: string,
  value: number,
  restaurant_id?: string,
  quantities?: number
}

export interface IRestaurants {
  accessToken?: string;
  restaurant?: {
    id?: string; // UUID
    url?: string; // URL da imagem
    username?: string; // Nome do restaurante
    email?: string; // Email do restaurante
    phone?: string; // Telefone em formato string
    address?: string; // Endereço
    categoria?: string; // Categoria do restaurante
    has_service_tax?: boolean; // Indica se há taxa de serviço
    canceledAt?: string | null; // Data de cancelamento ou null
    createdAt?: Date | string
    inicio?: string; // Hora de início no formato string (ex?: "8?:30")
    fim?: string; // Hora de término no formato string (ex?: "22?:40")
    status?: number; // Status numérico
    createAt?: string; // Data de criação em formato string (ISO 8601)
    products?: IProducts[]
  }
}

export interface AuthFormProps {
  email: string,
  password: string
}

export interface PropType {
  restaurants?: IRestaurants['restaurant'][]
  options?: EmblaOptionsType
  loading?: boolean
}

export interface LoadingProps {
  dimension?: boolean;
};

export interface OrderProps {
  id: string,
  amount: number,
  total_price: number,
  total_service_price: number,
  canceled_at: Date,
  restaurantId: string,
  buyerId: string,
  createdAt: Date,
  buyer: BuyerProps
}

export interface BuyerProps {
  id: string,
  username: string,
  phone: string,
  createdAt: Date,
  updatedAt: Date,
  has_service_tax?: boolean;
  orders: []
}