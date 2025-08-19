# ECLETTICO Shopify Integration Guide

This document explains how to set up and configure the Shopify integration for the ECLETTICO e-commerce website.

## Prerequisites

1. A Shopify store (you can create a development store for free)
2. Access to your Shopify Admin panel
3. Basic understanding of Shopify's API structure

## Setup Instructions

### 1. Create a Shopify App

1. Go to your Shopify Admin panel
2. Navigate to **Apps** > **Develop apps**
3. Click **Create an app**
4. Enter app name: "ECLETTICO Frontend"
5. Click **Create app**

### 2. Configure Storefront API Access

1. In your app, click **Configure Storefront API**
2. Enable the following scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_pickup_locations`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
   - `unauthenticated_read_customers`

3. Click **Save**
4. Generate a **Storefront access token**
5. Copy this token - you'll need it for `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### 3. Configure Admin API Access

1. In your app, click **Configure Admin API**
2. Enable the following scopes:
   - `read_products`
   - `write_products`
   - `read_orders`
   - `write_orders`
   - `read_customers`
   - `write_customers`
   - `read_inventory`
   - `write_inventory`
   - `read_discounts`
   - `write_discounts`

3. Click **Save**
4. Generate an **Admin API access token**
5. Copy this token - you'll need it for `SHOPIFY_ADMIN_ACCESS_TOKEN`

### 4. Environment Variables

Create a `.env.local` file in your project root and add:

\`\`\`env
# Replace with your actual values
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
\`\`\`

### 5. Install Your App

1. In your Shopify app settings, click **Install app**
2. Authorize the app with the required permissions

## Features Integrated

### Customer-Facing Features (Storefront API)
- ✅ Product catalog browsing
- ✅ Product search and filtering
- ✅ Shopping cart management
- ✅ Checkout process (redirects to Shopify checkout)
- ✅ Customer authentication
- ✅ Order history

### Admin Features (Admin API)
- ✅ Product management (CRUD operations)
- ✅ Order management and fulfillment
- ✅ Customer management
- ✅ Inventory tracking
- ✅ Sales analytics
- ✅ Discount management

## API Endpoints Used

### Storefront API (GraphQL)
- `products` - Fetch product catalog
- `productByHandle` - Get single product
- `cartCreate` - Create shopping cart
- `cartLinesAdd` - Add items to cart
- `cartLinesUpdate` - Update cart quantities
- `cartLinesRemove` - Remove items from cart

### Admin API (REST)
- `GET /admin/api/2024-01/products.json` - List products
- `POST /admin/api/2024-01/products.json` - Create product
- `PUT /admin/api/2024-01/products/{id}.json` - Update product
- `DELETE /admin/api/2024-01/products/{id}.json` - Delete product
- `GET /admin/api/2024-01/orders.json` - List orders
- `PUT /admin/api/2024-01/orders/{id}.json` - Update order
- `GET /admin/api/2024-01/customers.json` - List customers

## Testing

1. Add some products to your Shopify store
2. Test the frontend by browsing products
3. Test adding items to cart
4. Test the admin panel for managing products and orders

## Deployment

When deploying to production:

1. Set up environment variables in your hosting platform
2. Ensure your Shopify app is configured for your production domain
3. Update webhook URLs if using real-time updates

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your domain is added to your Shopify app settings
2. **Authentication Errors**: Verify your access tokens are correct and have proper scopes
3. **GraphQL Errors**: Check the API version compatibility (using 2024-01)

### Debug Mode

Enable debug logging by adding to your environment:
\`\`\`env
DEBUG_SHOPIFY=true
\`\`\`

## Security Notes

- Never expose Admin API tokens in client-side code
- Use environment variables for all sensitive data
- Regularly rotate your API tokens
- Monitor API usage in your Shopify Admin

## Support

For Shopify-specific issues, refer to:
- [Shopify Developer Documentation](https://shopify.dev/)
- [Shopify GraphQL Admin API](https://shopify.dev/docs/admin-api/graphql)
- [Shopify Storefront API](https://shopify.dev/docs/storefront-api)
