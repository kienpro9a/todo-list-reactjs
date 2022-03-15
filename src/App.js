import Header from "./components/header";
import Section from "./components/section";
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-white">
            <div className="card-body">
              <Header />
              <Section />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
