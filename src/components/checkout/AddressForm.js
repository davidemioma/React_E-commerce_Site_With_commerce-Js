import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { useCart } from "../../store/CartProvider";
import classes from "./AddressForm.module.css";
import { useNavigate } from "react-router";

export default function AddressForm({ next }) {
  const methods = useForm();

  const cartCtx = useCart();

  const navigate = useNavigate();

  const [shippingCountries, setShippingCountries] = useState([]);

  const [shippingCountry, setShippingCountry] = useState("");

  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);

  const [shippingSubdivision, setShippingSubdivision] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);

  const [shippingOption, setShippingOption] = useState("");

  const fetchshippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);

    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchCountrySubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);

    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);

    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchshippingCountries(cartCtx.checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchCountrySubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        cartCtx.checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    }
  }, [shippingSubdivision]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subDivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((so) => ({
    id: so.id,
    label: `${so.description} - (${so.price.formatted_with_symbol}) `,
  }));

  const onBackBtnHandler = () => {
    navigate("/cart", { replace: true });
  };

  return (
    <div>
      <h3>Shipping address</h3>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <div className={classes.formContent}>
            <FormInput name="firstName" label="First name" />

            <FormInput name="lastName" label="Last name" />

            <FormInput name="address" label="Address line 1" />

            <FormInput name="email" label="Email" />

            <FormInput name="city" label="City" />

            <FormInput name="code" label="Zip/Postal code" />

            <div>
              <InputLabel>Shipping Countries</InputLabel>

              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <InputLabel>Shipping Subdivision</InputLabel>

              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subDivisions.map((subDivision) => (
                  <MenuItem key={subDivision.id} value={subDivision.id}>
                    {subDivision.label}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <InputLabel>Shipping Options</InputLabel>

              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className={classes.controls}>
            <button
              type="button"
              className={classes.backBtn}
              onClick={onBackBtnHandler}
            >
              back to cart
            </button>

            <button type="submit" className={classes.nextBtn}>
              next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
