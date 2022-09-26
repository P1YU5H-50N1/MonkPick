import ProductList from "./component/ProductList";
import ProductProvider from "./component/ProductProvider";
import "./index.css";

function App() {
  return (
    <div className="bg-bg">
      <div className="bg-bg container mx-auto pt-20 min-h-screen">
        <div className="mx-12 md:mx-52">
          <ProductProvider>
            <ProductList />
          </ProductProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
