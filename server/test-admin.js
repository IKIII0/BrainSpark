// Test script untuk verifikasi admin
const pool = require("./config/db");
const passwordUtils = require("./utils/passwordUtils");

async function testAdmin() {
  try {
    console.log('=== Testing Admin ===\n');
    
    // 1. Test koneksi database
    console.log('1. Testing database connection...');
    const testQuery = await pool.query('SELECT NOW()');
    console.log('✅ Database connected:', testQuery.rows[0].now);
    
    // 2. Cek admin table
    console.log('\n2. Checking admin table...');
    const adminResult = await pool.query('SELECT * FROM admin WHERE email = $1', ['admin@gmail.com']);
    
    if (adminResult.rows.length === 0) {
      console.log('❌ Admin not found in database!');
      console.log('Creating admin...');
      
      const hashedPassword = await passwordUtils.hashPassword('admin123');
      await pool.query(
        'INSERT INTO admin (nama_admin, email, pass) VALUES ($1, $2, $3)',
        ['Administrator', 'admin@gmail.com', hashedPassword]
      );
      console.log('✅ Admin created successfully');
    } else {
      console.log('✅ Admin found:', adminResult.rows[0]);
      
      // Test password
      console.log('\n3. Testing password...');
      const isPasswordValid = await passwordUtils.verifyPassword('admin123', adminResult.rows[0].pass);
      if (isPasswordValid) {
        console.log('✅ Password is correct');
      } else {
        console.log('❌ Password is incorrect');
      }
    }
    
    // 3. Cek materi table structure
    console.log('\n4. Checking materi table structure...');
    const materiStructure = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'materi'
      ORDER BY ordinal_position
    `);
    console.log('Materi table columns:');
    materiStructure.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });
    
    // 4. Test insert materi
    console.log('\n5. Testing insert materi...');
    try {
      const testMateri = await pool.query(
        'INSERT INTO materi (nama_materi, level, deskripsi, jumlah_soal) VALUES ($1, $2, $3, $4) RETURNING *',
        ['Test Materi', 'Pemula', 'Test deskripsi', 10]
      );
      console.log('✅ Test materi created:', testMateri.rows[0]);
      
      // Delete test materi
      await pool.query('DELETE FROM materi WHERE id = $1', [testMateri.rows[0].id]);
      console.log('✅ Test materi deleted');
    } catch (err) {
      console.log('❌ Error creating test materi:', err.message);
    }
    
    console.log('\n=== Test Complete ===');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testAdmin();
