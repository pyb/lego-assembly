using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GenerateHoles : MonoBehaviour {
	
	// Use this for initialization
	void Start () {
    	
		GameObject hole;
		hole = Resources.Load ("Hole") as GameObject;
		//hole.transform.Translate (20, 0, 0);
		GameObject entity = Instantiate (hole);
		entity.transform.parent = this.transform;
		entity.transform.localPosition = new Vector3 (-0.2f, 0, 0);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
