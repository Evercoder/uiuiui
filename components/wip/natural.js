function Natural(context) {
  this._context = context;
};

function CubicSpline(x, a, d0, dn) {
  var b, c, clamped, d, h, i, k, l, n, s, u, y, z, _ref;
  if (!((x != null) && (a != null))) {
    return;
  }
  clamped = (d0 != null) && (dn != null);
  n = x.length - 1;
  h = [];
  y = [];
  l = [];
  u = [];
  z = [];
  c = [];
  b = [];
  d = [];
  k = [];
  s = [];
  for (i = 0; (0 <= n ? i < n : i > n); (0 <= n ? i += 1 : i -= 1)) {
    h[i] = x[i + 1] - x[i];
    k[i] = a[i + 1] - a[i];
    s[i] = k[i] / h[i];
  }
  if (clamped) {
    y[0] = 3 * (a[1] - a[0]) / h[0] - 3 * d0;
    y[n] = 3 * dn - 3 * (a[n] - a[n - 1]) / h[n - 1];
  }
  for (i = 1; (1 <= n ? i < n : i > n); (1 <= n ? i += 1 : i -= 1)) {
    y[i] = 3 / h[i] * (a[i + 1] - a[i]) - 3 / h[i - 1] * (a[i] - a[i - 1]);
  }
  if (clamped) {
    l[0] = 2 * h[0];
    u[0] = 0.5;
    z[0] = y[0] / l[0];
  } else {
    l[0] = 1;
    u[0] = 0;
    z[0] = 0;
  }
  for (i = 1; (1 <= n ? i < n : i > n); (1 <= n ? i += 1 : i -= 1)) {
    l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * u[i - 1];
    u[i] = h[i] / l[i];
    z[i] = (y[i] - h[i - 1] * z[i - 1]) / l[i];
  }
  if (clamped) {
    l[n] = h[n - 1] * (2 - u[n - 1]);
    z[n] = (y[n] - h[n - 1] * z[n - 1]) / l[n];
    c[n] = z[n];
  } else {
    l[n] = 1;
    z[n] = 0;
    c[n] = 0;
  }
  for (i = _ref = n - 1; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {
    c[i] = z[i] - u[i] * c[i + 1];
    b[i] = (a[i + 1] - a[i]) / h[i] - h[i] * (c[i + 1] + 2 * c[i]) / 3;
    d[i] = (c[i + 1] - c[i]) / (3 * h[i]);
  }
  this.x = x.slice(0, n + 1);
  this.a = a.slice(0, n);
  this.b = b;
  this.c = c.slice(0, n);
  this.d = d;
};


// export function solve(v) {
//   var i,
//     n = v.length - 1,
//     c = new Array(n),
//     _v = new Array(n),
//     sol = new Array(n);
//   c[1] = 1/4, _v[1] = (6 * v[1] - v[0])/4;
//   for (i = 2; i < n; ++i) c[i] = 1 / (4 - c[i-1]), _v[i] = (6 * v[i] - (i == n-1 ? v[n] : 0) - _v[i-1]) * c[i];
//   sol[0] = v[0], sol[n] = v[n], sol[n-1] = _v[n-1];
//   for (i = n-2; i > 0; --i) sol[i] = _v[i] - c[i] * sol[i+1];
//   return sol;
// };

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

        // var py = solve(y);
        // for (var i = 1; i < n; ++i) {
        //   let dx = (x[i] - x[i - 1])/3;
        //   let dy = (py[i] - py[i - 1])/3;
        //   this._context.bezierCurveTo(
        //     px[i - 1] + dx, py[i-1] + dy, 
        //     px[i] - dx, py[i] - dy,
        //     x[i], y[i]
        //   );
        // }
        // var spline = new CubicSpline(x, y);
        // for (var i = 1; i < n; i++) {
        //   for (var t = 0; t < 1; t += 0.05) {
        //     let t0 = t * (x[i+1] - x[i]);
        //     var val = spline.a[i] + spline.b[i] * t0 + spline.c[i] * t0 * t0 + spline.d[i] * t0 * t0 * t0;
        //     this._context.lineTo(x[i] + t * (x[i+1] - x[i]), val);
        //   }
        //     // this._context.lineTo(x[i-1] + dx, y0 + dx * t0, x[i] - dx, y1 - dx * t1, x[i], y[i]);
        // }
        var s = new CubicSpline(x, y);
        for (var i = 1; i < n; i++) {
          let dx = (x[i] - x[i - 1]); 
          s.b[i-1] *= dx;
          s.c[i-1] *= dx * dx;
          s.d[i-1] *= dx * dx * dx;
          this._context.bezierCurveTo(
            x[i - 1] + dx / 3, (s.a[i-1] + s.b[i-1] * 1/3), // p1
            x[i] - dx / 3, (s.a[i-1] + s.b[i-1] * 2/3 + s.c[i-1] * 1/3),  // p2
            x[i], y[i] // p3
          );
        }
        // 
        // 
        var c = new Array(n - 1).fill(1);
        var b = new Array(n - 1).fill(4);
        var a = new Array(n - 1).fill(4);
        
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