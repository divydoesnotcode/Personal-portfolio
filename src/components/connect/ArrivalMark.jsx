export function ArrivalMark({ pulse }) {
  return (
    <div className="connect-mark-wrap" aria-hidden="true">
      {pulse && (
        <div className="connect-rings">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="connect-mark">
        <img src="/brand/logo.svg" alt="" width="88" height="88" />
      </div>
    </div>
  );
}
