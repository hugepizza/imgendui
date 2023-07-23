export function Footer() {
  return (
    <div className="text-center w-100 mb-3">
      <hr className="my-2 basement-hr" />
      <a className="mr-1" href="https://github.com/hugepizza">
        github
      </a>
      ·
      <a className="mx-1" href="https://www.cloudflare.com/">
        cloudflare
      </a>
      <div className="position-relative">
        <span
          style={{
            right: 0,
            bottom: "-9px",
            background: "transparent!important",
          }}
          className="position-absolute btn squared mr-2 mr-sm-0"
          id="darkModeBtn"
          title="Dark/light mode"
        ></span>
      </div>
      <h1
        style={{ fontSize: "11px" }}
        className="mb-0 mt-2 p-0 text-muted no-pointer font-weight-normal"
      >
        imgen.space
      </h1>
    </div>
  );
}
