import { css } from "@emotion/core";

export const fontSize = 16;

export const globalColors = {
  blue: "#005ece",
  lightblue: "#039be5",
  red: "#ff6673",
  gray: "#eee",
  white: "#fff",
  black: "#111"
};

export const globalStyle = css({
  html: {
    WebkitFontSmoothing: "antialiased"
  },
  body: {
    margin: 0,
    fontSize,
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: "lighter",
    lineHeight: 1.5,
    height: "100vh",
    background: `linear-gradient(45deg, ${globalColors.lightblue}, ${
      globalColors.blue
    })`
  },
  "body > div": {
    height: "100vh",
    overflow: "hidden"
  }
});

export const base64Image = {
  chrome:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADJElEQVR4AT1TQ4AuRxD+qnrm/2et5/VurGf73eJkr7Ft23ZyiXHKKafYtvNsrM351d1V2Z2gjfrKRe7ndZhq2x6NmJ3DIbc66XqloVLGx5arc62qCmLazSWl39de3DOy7y7PFIZovF0EABIGPz5XxkuvGJeeN5pL7dDgTWrtBRCZqSKAajIB9BKbl6i84pH6y/snDjyY4oZbC0K/nHkSz7tiTLY+XdEQWfuOUT0aIgkCOgVVQDxNTkCVwLzRlEcn1F2ZPdDxTMiJBjvuMiUukG8N89zIBJaZA58vkGSzQGJCCsyBqvdOVUIV+rMwWL3ysJeH4wAAzmlrvvmGj/fMPWqsYG2xCYM4RtHMGqSPXAkYRa7nN2THesmExSGztwaYW1E9eDPAd9Cpz55b9V1t+s/VWwbr7/iyQ5WFZqxYiY62G/Fp93RMtQ3NfThi5AFg5DtExSVqAiH11K6+ZK6xpy9eF1p/6b7pxVq/f5iOTJWg++IncO8X07B9d4zdnQV8tasSc49ehKbgC0ByRJRSCrmC0/IFO/UtogIxpG8eXQGeewy+7JmBzEiMijKDilKDXH4C722bBtTMBwUOlDJKhgDSliBxOAHpvMPG2SX4tKwaxXkPRwQkEVSIAkmjBJQc//0Eq8oeUYUXoSKTwgvcibktw6gpitA34TEwOcuiYhx/+CAwsRGgNAChKbAI9gRw8qMG3O5J69PMumN0iF7qeQVXH3ce/thVhYCB2jlDKMs+BUgvwEUKeFJFe8Hqj0ke1G9quE+ZbgdgGRSO2SxaK6qxbvahiHOCofbf8dph+1EepaAqdhIdetH7AdyRMGj8pbbERfwtiOYCapk4yDlLWckjN5jHW0dZtDV59XlxBhqK6J/jsV9ZWmJirvuzlvcv6ozZ+pNUZKNCQyceUWBUfSRtM0Jpq/eqeY9/wRtzeTlpCuydMnfM7ZTaSSbt87sOcMauUCf3Q7Uv5zxVuRzf3RozxJEX9Fmn94+OuxXpNB9wk2ATkPxfznV/1bEYQteR7XLEH7Mqd8Z++XEl2dZ35k8gzunuQkG/Ly/jETCxOAUzBAD+BhTZxancWpFRAAAAAElFTkSuQmCC",
  firefox:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADeUlEQVR4AU1TU2DEaBicP8m6tm3zbNu2ns62bdu27att2263q2yTTbL5rtvjw3yambdvQG+dDPlCsNeuu4w/9skuLrB/PrIWd1eD/fTra5y3XV/juO2WetcpLw/I0QHura5ZVvP81XxgDmCn/P7hLdwOOaWHXPHlzGPHfbzuPOmLDbrou1X9ou/X9LO+XKYLPp/bfL1z4/5vRbIFtD19d+14WKBsDNdV9hv33P+eyEdO9Lhcu+XEj1BUhImmsTcZORV2n8ppdhG7hijshFxxRf359Sv3TfZ+9Pt+93ECAIwP2w7SrYsPni/eogVHi/70sHXuQufTnF0ghJIXXlmFZd1JQ8ua/+xqW2zkQZUf9vR9IB1Qc8vXHACYrMaUlKBNHIAW2sfSzytTGtt/8BvssfAZ3GsizHY3jKrG5hadfO848ydVhCHj0NArAYDN3ZoX71ujbo1YLFl5MsQxpqk+WMR0vGM6GB95q2DeckL3erElA6nBa/TdoxpjqFmTl78vFnwO7KWIiIWRSND9jNwcIhM13O3aCz/OFSGSLUIWJSieze2+hbLDspjPN0zwFcV0vdZyIud1Ilz1AdBAqsxgH1Bx07d74rt+K9TFCcxMOeFcnAe5V+BZmEduUjesMTP6zKKIXk9ymiBL0JiPQeAJikqwmYDdw1fQOzuP+HAfqjMcqBkKx+SUB0ZNRpBzDHA4WLCqYI982xirOzIvyy+jK9hCwWYbiBkZM1s0+HgBAvkxLgt4eyUbP3XZUJG9hM/uXiGESUwbFDapy1LB7X1K8YS8Re0ekUGVoZNKEEUB33ZbcdHnCTjx42x82wrYNDtOrXKCc2u0XmNDz4/WuejyglkOADQFj4segltk8G2BDDrhoGwJJ1Z6cXbRKq4oWcKHpyzh6HgFG41GfapVwOA41wwAwvePDHBHXVfy3fsP9DwHnb+E/EzTNHBWs86OiXSx4+MBZmDk34Z3CrrsZoLZrdTtEaPcCOCvLPQdVsQARN6VlPzFx4U59MtueXr9AfnUcngedRyVR93HBpDv/2r/AnqqOP1XAFEB3/mp0QyBYb+wEFZos1qB7QcLDrvlwZSUntdyM10flWZrn1RmKx9VZTleL88cPTsp5VkBXF5GhNF8a2ES908a/8XPZUUcz8ADiAsDv+v+1pCjq0xBh1vAVwOIB3bCx/7v+RODWtK1Q31ZvwAAAABJRU5ErkJggg==",
  safari:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADXElEQVR4ATWTU5hjWRSF1zlxSu3uwtie1Ni2bT+Nbduetllt23YnbbuDMsJ7j/bkpr56WHhY/9veCIfDBTW1tPGGpOBOJ2or1UbcmlPqFUdOJ0qWFnYpyVvaUryDK1gq1cjawSOB5qT1xcLdMjZgo6Lf18uCBm6StGiPirWkrC+ItgacbTrdUGBgWR1wrDxyMLfp6xmCnhpjm/vHCXPXBKnvzuuB8cI8NzpnvpmtaHNUbiI6Vu4wtt3E0A4v8G3cl1r70jCLbhqSE9U10pw60dBJ0ygvQ2eOl3TGZDJ3/RMVr/28jzYdlWuJRvkclgNAY/0F79SsM5ftTlvyENOeI1yy1oCFbCCLTNDC7q5unB/bwO6Y94NnnXbLcWvUZc2Nt70DADwUqg8u2EMvbK610ADpboAN6ctCeLJoLtZo8kt8t3EE/hzwHHqffxfqe1W4t0RTWLiXvRAKNQRByd1XfTbpmKn+8Rh1/itO/hEx8k+PEhbH6fiJ62nR2x8THd+dHnj+M8KkNPX4K0YX/5KgL6fGDWX2XsWPNqiTmnOCZaQylhbQJGCJDCq8GksQxY3jBuKnqgsw5f4X4E3VI0MGOaVMsyVZrF6fxJUQZJSC0Qpa5tO2gGwOvSu9CJx/Jgbe/TD+eOwVQElokZezLUhDSpvc5YH0gRIeMB5F3CuAdJOF96/tgstSR/Htyh0Yec1jSPMi8NYMjB2ES2i4FXgpN6bclz7AAyd8HT61RO4qI4IrI8015aV4iB3DY7N3oa9djmyK5WEJpAFqM+gslSkhwinFcpfv+I/DPBL5VVxc3jLg7C4aVdylrzWH8OjkOFbkToRL+IGUC0i6YVpd6CyAkqzR53XVCPVoHhCJ/C04AFT7rut959mphef4c55RayBT7HRTZAeQPwbwZBC+lA+9bG56ZIw8u5R57jijZWG195reAOBui25ikaqwvqXLuEflBXdMKCvqedOWOk2twg3NQACDm4GVccYurIDnltMbF11bOv3RCMK6LRZuP+Xlc4a3/8OcEs+iOVNe+WfMyh1v9V+nXui9jhy9PWCd+rdm1Y5Fc6a+QhN9Hme7bPYI1vGNBc2eM4dF94e501tHX+KLzP734qWzxj7iKDLr34tbRl5cuP1YfjN37lzWwf0P5ahAscaevREAAAAASUVORK5CYII="
};
