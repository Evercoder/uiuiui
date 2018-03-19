function Natural(context) {
  this._context = context;
};

export function solve(v) {
  var i,
    n = v.length - 1,
    c = new Array(n),
    _v = new Array(n),
    sol = new Array(n);
  c[1] = 1/4, _v[1] = (6 * v[1] - v[0])/4;
  for (i = 2; i < n; ++i) c[i] = 1 / (4 - c[i-1]), _v[i] = (6 * v[i] - (i == n-1 ? v[n] : 0) - _v[i-1]) * c[i];
  sol[0] = v[0], sol[n] = v[n], sol[n-1] = _v[n-1];
  for (i = n-2; i > 0; --i) sol[i] = _v[i] - c[i] * sol[i+1];
  return sol;
};

const t = (val, arr) => (val - Math.min.apply(Math, arr)) / (Math.max.apply(Math, arr) - Math.min.apply(Math, arr));
const xt = (t, arr) => t * (Math.max.apply(Math, arr) - Math.min.apply(Math, arr)) + Math.min.apply(Math, arr);

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
      y = this._y,
      n = x.length;
    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var ts = x.map(v => t(v, x));
        var px = solve(ts),
        // var px = solve(x),
        // py = solve(y);
        py = solve(y.map((v,i) => v * ts[i]));
        for (var i = 1; i < n; ++i) {
          this._context.bezierCurveTo(
            (2 * px[i-1] + px[i]) / 3, (2 * py[i-1] + py[i]) / 3, 
            (px[i-1] + 2 * px[i]) / 3, (py[i-1] + py[i] * 2) / 3,
            x[i], y[i] * ts[i]
          );
        }
      }
    }
    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

export default function(context) {
  return new Natural(context);
};