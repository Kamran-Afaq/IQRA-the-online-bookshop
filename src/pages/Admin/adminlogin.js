import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import logo from "../../assets/images/new-logo.png";
import "./login.css";
import { loginAdmin } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/verify");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin/verify");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
//
  onLogin(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginAdmin(userData, this.props.history);
  }

  render() {
    return (
      <div className="containeradminlogin shadow p-3 mb-5 bg-white rounded text-center contain firstdiv" >
        <div className=''>
        <img className='logo-admin' src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAADyCAMAAAALHrt7AAAAyVBMVEX///9NUVxNUVpOUFz+//1GSlZOUVpHSlOSlZlKUFr09PVLTVlAQ1D//v9gY2tMUl1rbXilpqo+RE5TV2HNztBLUllaXWZMUlnz8/NiZW5RVF1XWmNAQ0rT1dZOUF88P0nl5ulCR02NjpO3uLvg4eQ3PEm7vL2foKSDhYnExceAgYatrrM4PERHTVNZYGVqbXF1d4Ho6/CDho6PkpV8eoUwND7b2uBjZGdscHHBxcNSV1jg5eJ8fX2Ym5s0NTetrq8uLjoiIjA4NknVS1RJAAAQbElEQVR4nO2dCXviuLKG5U3CezDgHWy2EMAOIZlJ+qa7b58z//9HXUlmxwE7IOLM9fdMphPiGL0uLSVVSQBQq1atWrVq1apVq1atWrX+7RJFoH91GfKFS/apP8NfSnvYrJSGbeXzD0IfLjRNkyolLQy9ofK5qjNEmsqZVRMnqJo2z+pPKS0Xlsz1OEmyqiVJ5ThBs5dleUaSZJqq5g+G03aFNB2+BJYs9FTrtZyNYiSbpmVMyz6HW6jtaYIAo9cyf6P7cqczbgLSQ36yj2QlUpx5BAVVVUrY6FkyZWu6anl6ZUQKQ5hANxJ60l9FgUQwGnOcVsnqttY04jrjdmELzSQOPbAsz6XSQUPqqHdFL3ejHhe6LAt0uRRkCuO40KU6GGo9aVB+5LqdSMcwkXrSn4LXP6ic1WVaoitoNBbUp4LX2hxnXeAC3ka6JKhCwUshJ7TYluYa8lRBK/bYdcSpBuPSXEF3JYB4+d8EJOqSXAN9gWqgqqsGqrpqoKrrdkA3Wm69HdB2EYLpcsRNq9zP6fDP/H5EbnbZjU7oZkDx/EeYWAgrshoMZyE3AMI1TBkaEUI8FcdxSGozMxJzINxelIlkqfyuYNRl1UncwEITTeIhhLtAHO/ojHoG5kDTFHEQHgDxsvRS/laFxBhIn0W0ih3w8A6XtAGTsYkpkL4M+vxHQi6T2CZTIMVJnY+BFt/PQvchL38IxPcnLFYtmQItUrnzMZCZTBkQsQSaWB/T8KSnsEgE8cqeHUOgRniSBwMhD3wfIOVH/+MOYQUErea3AeqmqXOi/ayA+HD5HYBouPOMeVZCg4tKnyM2FnqwuEI8PB9deybBBGh2rvlsq1147ZgtC6Cm5XTOtJ9tnSsabisqBkBKxJ3rD74X0CgpSoMVti8r/5EYALlRCaBv0SmccXn2atz36LafPp4FHRqodD7YObEA0vWXJD0PQ1yf4UWFzxMTC+mgHZyYCG2A0PMlRc8XG9dHB/F5VwEDXd9AbIBEoBRoRbjKRdcehRhVORHMpfNAVFefszICejrfhKiS+IKy54oRUFDQ275+NhQjIL+ghaxrez6sJnieeh6GKBpdVPocMZqCD1AxoOTqS42MBtZuMY8bza6+eMrG9RELmki+uivHDKgb+QUM9Az072Ahqvf+Of+0008YpLAyA4ofHs4QBY35Z0t9QgyXgrunl4JJTvv3Cqfopx1Ua8okbswy+vBbEgSYT9PhVJVNGJwlUBwdxVa3kiZsAvtMA14vfSjk0sgmjxhlkzAFEt95Idftlkn0jo3YAr1GwlGKAgehA7Vzu0LEbA9Z+VgL4zyF6fgICCM64V9nNmh+fh7LNk9BB+2jjgEDhYOzHcKUbLdF/f6k3DuyBsJP+jU6AkLn0mJEoAsyFn4Wf5d1X1kDieCJZpStRYCS+FwDAq+ag0WG37IrXeyzsYZ9kxO2wuZ6O99EmuvZByq6u2kt9kDLxOQgQjQjK0V4YEIF2oWxWZMIS45XN8iXQ7KTPjXDforCH3MkwAIhoXjr15aNWd4AaIGB3kDcHDTa4B4JXHiuCQHwZzvfLbvR9AYpmjPEqcHqp7kk89Hh1lEdKMOYjqXrVxby+4aovx2VyBrz/U9clBOd/g0sRIDs1fdzqXMUE9JBnIbJbqawEnHbIK3V3hpUn6OQZA5+JZAIAsipi1UZplqHDw8n3rGTOhzqNxWwSkS917ZAHGqsbwTufYvn5LB9qsqyt1Cc8Jy0jjy+jjukl9sr0DJNHdk05b66mpJPPbVnboAE/z6ro/8TaHIHyzzZq7B1TknBBwhut8TrSOVhX9k2GBEsaQdAhlxooSFQJmEo0xF424qShxFoP+Keb5XPkZwgYguEv4YWdn2iTcMeSHg0+qFv/WjR2V0GtwIyYvGHQqGxt0ARxV8DhJv3APPAjYuJ7RFhZyF93D7in/trrMcZ0dmr/N6L0ceDE1Og6SzCBoHq+6bfxU6NJggOb9l/lqtX9kNJ+UDEZ9r9Wf64m2OXANgehCGibWE7kpJ/ZhbELUbuJ4t7+tpoP08jdxliFwi3r/CEx8pmsX7050mystG+03+P93/7kmRtO12F72boxFrKsThT9k+89zWBqBmU7p+ZHKF1PULJ5KB6kJg/XbHrpJlXEyfOB2spHwCddO+uaiF3+BAkIdoJPCDiAOwTkZ8a5BKTT7Jw1wsSesWBePnxRgOr0ogsROoOGf1WIwaJL9Bfrg4UcqkdddpVm9xqsrMMj4GycWh/PFrpJp4CHlVimBcSin7SAWcy1siBT1qfXnpPBxXc0Mdd+vNv+hxWPRz+6pimiftpqJIJ4WG3R7YYnNC1gECcn1S28v6HUfaoDWqhLHRECvqWudDh+gX/7s7zIUeG0iS1/ShCR0DR6RjMtaocrkX5gW/STkTSldHaEpPyTzVK5/DYye5Sl4G2KQwUPAV+8OSroTN5pVU1nhsRvwcke6dXjK4FNOmb+akJ0nNmBLKtIxpSH+5NJZei8L3RznwgPSsx5O+whe5anjbcKXM7QPsWOh04vxKQ8mHOXyeMaenaSSed0Wu7Y7PjhI9NUrBsgfS+n7Uf9OR7UmDP9idM+rMm7IQx0tOLelcCGuYBBSTHjIw2tACN1Mne6Enl02DtzJHlXvCWyllTecIWgg975aE1cne10glPnvR3JSAjpwHJnkcstM7nmaCUlmMUCfybsna/yUtx6DjQJ0T2nQ+flP3yEKIHtDP09u9PlfM6QLnRR9mzyf/XHd1bJ6S1fyYJ5ECqzQLCaGLzTsf2bGIF+86ODx4/rZW7YYyOT9seOyDxKHGEFC2wES1jy4ZRrLuikvBk+qaPEk5qAkXBr+ii2B7ACAm2zRvwLrDx9elvfEddUfB/WbHwv6RjDHe7HBT2Z1P662OwqwApx3MaLwhsAxfQtn0Duwui26UZmQp4eZQj11VcRVkOH5wIP4mW51MW328Z6N1VCAOR6+pg9T0A9oH5kTW+m8esgOZHBjKg7fHYQr4deC0YjESxGfh4CFGWqWMjQICmUtAKWvhyDxr4P+gZnufj6qnorrJWxoPte/gWtEr3k5w12Ku0oWDf5SJAdguSKofLyUO/NRD1BwPXw6U+8VteC5CH/8tAhmzgyw2DPgEDDzfQuteVrVygUFu6R7MmCiSnDhugbnQI5NsGXAHhb4IWHOkLFdepqYJw+QMMBPRfj+ljBwNBUjPphYEXRN3MJqsvDORmjUnJsVAnb2J0DaAZMg97bcMOUBB4iAL59uNgmZBeuTm3kPf4jqucqM9sSIARXFnIQx5vRDG1zArIBeumJIrHqUOOLLABWob8ERBGMXB3wFMgXNZgTvplA7ue0MiAwArIyy4JSGOzW9HyCIh8q7uukQcUHJfmCkDNEB4ByV7g2x62SUBK63st7DXj1oT7vsAw3nE5Rf0Z99W+Edj4l5C2OojraWahVZXDFZOaiJrpOLPd4RkBpfDYQtjvsbOxn7gAgor7ZcOnhoAtnwKBZ8JI+nWYuT0t8gdWV9EBaTT4S6eNR19ZKDzyfTHQ9ascGfOK70VZ1RSfuj0PpJnjqe3e3ik0zw3li9gX2dsFRybFssCiUxDBU8H00k1ZZIsCjYykD1dx143kRW5IX8TTk72b4L+SpQjmrJZcXOXiMvu5MqD1jCYe/hhr6n6uCZ4C5kV/9P7BQhcae83cidGFQDqYFN0UsAXaCesr04c03DUxSavNAZqjHW7Zsn4N6Zwpp3ZebKG3ginnu0ro2sjqmF/QnaFtteOiNtg/WFnHPuwyhDs8i+mJEl8MZJRY9Nza4XW3qbgRtwkHCRyK986K1kn2hrfz1Agyywle0ZTzPcFkQoJY62L/Qhsg/I2Dm9F+XVrsvYcjnjoT6GKg0fgTQJyAwsWfeHVn0A43Fuh0TKi197q6n/Yez2EA8NpAYDhGxPMtJQ43cWRF9iRbKAGLDZDTMQUhmm07MPd3KJu7QH33ZM7ZFTyF18Gj439O8v+OKNDgICMaRXd/urG7fB3+Cg970Udw8rSZy4GucIRSzliGUISlaepRnxPesw7rZ5mHn1N2B9xvHzezbf7WvqCvs1+svyy/9zXJyUztrHR8kIE2/No8hdN3Je3hrlzP/96/wcrpZ0UqXbuku97pN0/c8cuB9NxV11OSnVM5dF8OBKZnjv85ksmdSiH8aiAAgl0vwey85/UDdB64XrCHgqB9/OEGXw4U/71bm+Q05bnjKsjJSN5E8vCUXvt4vf7rT6L9sfESOD4NB4alHsX4ZYtrWJtsBgGuAzN5+nog8ce61+5Fsxh3ek/RgYki714nMfYskocd2/cTH6fx5UDENe3zMsel0dNrNrdz9z0HY5lloy0HYUqS0FTfre7Amt36R98UIm8b3W6HOymaqLlxDOIZtpIqLCvsKRDhcf/H38HOAo4o7gLtBYlHi8RRbhIFv0S4gDHYm9PNpC3QwdrbYYDvUBUA0ukWib2Vkam1AVrn0K6LkbvUs6MKAOXIDTfToLJHM1UTaGdZJC05Nako0CYCWfojqSoKtEmFsspuPqwoEHiTJFVCCP1ddndoVYFGD1S/Su8OrSrQ9n1LXl95oLKqgaquGqjqqoGqrhqo6qqBqq4aqOqqgaquGqjqqoGqrhqo6vp/DuSxLs7lKgfUalRetswVBzI5cqRYtcVxpYCwhGqrFBD/rwSqvmqgqqsGqrpqoKqrBvqk5JzX1gnnwuHrl7zRjYDUx0eV/CvwjsxZlsT1yCG7KTlZThJ6Qs+EkOupgqrypuk4sPJA0oS49thOd/R2S3LoV7QECpJNDf+qIdkAeORgPU/qWUPwqlUdiJzMOMWllBdAVEjK22tf0GL8WsS1dAL0CIBBgBQkYKBu1YHUGXBFgC2kYgv1td6EnMQ4/olvfEfP82sgAtQnB6i0w37lgXq9qAsmI9DUegQIN6LxEOjaOAYuiH+RbcW0yhELYeM1x5UH4lQDADQAbgaEm726wLbBQC8K2XUbg4a2Aoqx7RbzigPxnIafeWAr4Fkie4nhFqjxDMDoP+4WyP3vK3CrbiFHlug+MJEcC5oBaXMASJVr/NMGnrYLNIbkVJVqA5E+W/wZxz9F3CljoCQKGwAMUUSqWtDUInfVhjQMlOArqg7UG7tg8o+m/acLpv8sgE4TlUd9iIF+S4IkhysLedoLBuLJRzdXHOgvXM3wfJ8MM73seDilqfGCtsSWgTxvKduBVYl4M2pXHIgLHlvk8DtBtR9b0LYD248kAfawN9QSoOPwgS0I+HVO9e0A8iaXPgaf57kBkCl35B4B6skdU+gRCTwvEGdO6EGH59Qe/V7wBRX/xuzxnTxPtqisgmmdvnrBm9xM+DGlxXjA0zcBUt8KAjWlry5sEQk9qXGeheo1+urCFpHQ04ptLsAjvf0d6hxuQ8Xsg4GGF4wNN5OglfioM/uSzvRGUmHxneniaPzVxT2vcYnP1hPBMDLXMYsKSsYVSDu1TzxHzYzoq4ueL9M0o0a5oxB0MExUAVYUiFOTkh/6TE4WGnkhumTRjJ1U67Hsx9VmJyVN3xJJUqtlJVWSxvY9+OzZG/Hw2QtaFVLgPcyv/mHC31qieHoz6W21fwRNrVq1atWqVatWrVq1al2k/wN1UswKpY5wAQAAAABJRU5ErkJggg=="} alt="logo" />
        <h1 className="header1">Admin Login</h1>
        <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 my-2 mx-2">
            <Label for="exampleEmail" className="mr-sm-2">
              Email
            </Label>
            <Input
              type="text"
              name="email"
              id="exampleEmail"
              placeholder="Enter Your email"
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <br />

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 my-2 mx-2">
            <Label for="examplePassword" className="mr-sm-2">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Enter Your Password"
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <br />
          <div className="submit">
            <Button
              className="btn-admin-login" color="primary"
              onClick={this.onLogin}
            >
              LOGIN
            </Button>
          </div>
        </Form>
        </div>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginAdmin })(withRouter(AdminLogin));
