import React, { useState } from "react";
import useProductPrices from "../../../hooks/messages/product/useProductPrices";
import useProductShop from "../../../hooks/messages/product/useProductShop";
import { Link } from "react-router-dom";

const ProductAdd = () => {
  const [search, setSearch] = useState("");
  const [fetchProducts, products] = useProductPrices();
  const [fetchShops, shops] = useProductShop();

  const handleSearchItem = (e) => {
    e.preventDefault();

    if (search.trim() === "") return;

    fetchProducts(search);
  };

  return (
    <div className="grid grid-cols-2 p-4">
      <div>
        <form onSubmit={handleSearchItem}>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search item here..."
            required
          />
        </form>
        {products !== undefined && (
          <div>
            {products.map((product, index) => (
              <p
                key={index}
                className="max-w-fit cursor-pointer hover:text-red-500"
                onClick={() => fetchShops(product["product-name"])}
              >
                {product["product-name"]}
              </p>
            ))}
          </div>
        )}
      </div>

      {shops !== undefined && (
        <div>
          {shops.length === 0 ? (
            <div>
              No shop available. You can still proceed by providing your own
              price
            </div>
          ) : (
            <div>
              {shops.map((shop, index) => (
                <div className="p-4 mb-5 hover:bg-red-500">
                  <Link
                    key={index}
                    className=""
                    to={`${shop.name}`}
                    state={{
                      info: {
                        title: shop.name,
                        itemValue: shop.value,
                        sourceId: shop.productPricesId,
                        genre: shop.genre,
                        platform: shop.platform,
                        isGenerated: true,
                      },
                    }}
                  >
                    <p>{shop.shopName}</p>
                    <p>{shop.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductAdd;
