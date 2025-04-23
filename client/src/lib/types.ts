export type Restaurant = {
  restaurant_name: string;
  restaurant_address: string;
  restaurant_location: Location;
  restaurant_contact: number;
  restaurant_contact_person: string;
  restaurant_cuisine: string;
  restaurant_password: string;
  restaurant_email: string;
  restaurant_city: string;
  restaurant_state: string;
  restaurant_zip: string;
};
export type Location = {
  lat: string;
  long: string;
};

export type RestaurantLogin = Pick<
  Restaurant,
  "restaurant_email" | "restaurant_password"
>;
export type Organization = {
  organization_name: string;
  organization_address: string;
  organization_location: Location;
  organization_contact: number;
  organization_contact_person: string;
  organization_password: string;
  organization_email: string;
  organization_city: string;
  organization_state: string;
  organization_zip: string;
};

export type OrganizationLogin = Pick<
  Organization,
  "organization_email" | "organization_password"
>;

export type OrderStatus =
  | "Preparing"
  | "Accepted"
  | "Rejected"
  | "Picked Up"
  | "Ready for Pick up ";

export type RestaurantStatus = "Open" | "Closed";

export type Listing = {
  listing_id: string;
  listing_item_title: string;
  listing_item_description: string;
  listing_item_quantity: number;
  listing_item_category: string;
  listing_item_restaurant_id: string;
  listing_item_expiry_time: string;
  listing_item_pickup_time: string;
  listing_item_status: string;
  listing_item_image_url: string;
  created_at: string;
  last_updated_at: string;
};

export type Order = {
  order_id: string;
  order_status: OrderStatus;
  order_items: Listing[];
  order_confirmation_time: string;
  order_pickup_time: string;
  order_created_at: string;
  order_restaurant_id: string;
  order_organization_id: string;
};

type ErrorResponse = {
  message: string;
  reason?: string;
};
export type APIResponse = {
  success: boolean;
  error?: ErrorResponse;
  data?: any;
  token?: string;
};
