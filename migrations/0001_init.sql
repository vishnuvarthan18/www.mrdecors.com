-- Portfolio items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Seed with the starter portfolio (idempotent)
INSERT OR IGNORE INTO portfolio_items (id, title, category, image, featured, "order") VALUES
  ('seed-01', 'Royal Red & Gold Stage Backdrop', 'Wedding', '/images/wedding-1.jpg', 1, 1),
  ('seed-02', 'Floral Arch Mandap', 'Wedding', '/images/wedding-3.jpg', 1, 2),
  ('seed-03', 'Traditional Puberty Function Set', 'Puberty Function', '/images/floral-1.jpg', 0, 3),
  ('seed-04', 'Pastel Theme Puberty Backdrop', 'Puberty Function', '/images/table-decor.jpg', 1, 4),
  ('seed-05', 'Superhero Theme Birthday Set', 'Birthday', '/images/birthday.jpg', 0, 5),
  ('seed-06', 'Balloon Arch Birthday Backdrop', 'Birthday', '/images/arch.jpg', 0, 6),
  ('seed-07', 'Housewarming Entrance Decor', 'Housewarming', '/images/floral-2.jpg', 0, 7),
  ('seed-08', 'Traditional Kalash Setup', 'Housewarming', '/images/reception.jpg', 0, 8),
  ('seed-09', 'Corporate Stage Branding', 'Corporate', '/images/corporate.jpg', 1, 9),
  ('seed-10', 'Product Launch Backdrop', 'Corporate', '/images/lights.jpg', 0, 10),
  ('seed-11', 'CNC Cut Acrylic Panels', 'Custom Fabrication', '/images/fabrication.jpg', 0, 11),
  ('seed-12', 'Laser Cut MDF Jaali Design', 'Custom Fabrication', '/images/wedding-2.jpg', 0, 12);
