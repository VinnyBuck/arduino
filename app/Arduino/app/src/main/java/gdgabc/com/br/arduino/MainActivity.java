package gdgabc.com.br.arduino;

import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private FirebaseDatabase database;
    private ImageView mLap;
    private boolean valueLamp = false;
    private DatabaseReference databaseRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mLap = (ImageView)findViewById(R.id.lamp);
        mLap.setOnClickListener(this);

        FirebaseApp.initializeApp(this);

        database = FirebaseDatabase.getInstance();

        databaseRef = database.getReference("modulo1");

        databaseRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                MainActivity.this.checkStatusLamp(dataSnapshot.getValue());
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        databaseRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Log.e(this.getClass().getCanonicalName(), dataSnapshot.getKey());
                Log.e(this.getClass().getCanonicalName(), dataSnapshot.getValue()+"");
                DataSnapshot valueChild = dataSnapshot.child("led");

                MainActivity.this.checkStatusLamp(valueChild.getValue());

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    private void checkStatusLamp(Object value){
        if(value instanceof Boolean){
            valueLamp = (boolean)value;
            if(valueLamp){
                mLap.setBackgroundColor(ContextCompat.getColor(MainActivity.this,R.color.lamOn));
            } else {
                mLap.setBackgroundColor(ContextCompat.getColor(MainActivity.this,R.color.lampOff));
            }
        }
    }

    @Override
    public void onClick(View v) {
        databaseRef.child("led").setValue(!valueLamp);
    }
}
