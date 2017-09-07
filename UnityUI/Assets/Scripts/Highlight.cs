using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Highlight : MonoBehaviour {

	int highlight = 0;

	void OnMouseDown()
	{
		if (highlight == 0)
		{
			Debug.Log("highlight test");
			GetComponent<Renderer>().material.shader = Shader.Find("Diffuse");
			highlight = 1;
		}
		else
		{
			Debug.Log("highlight off");
			GetComponent<Renderer>().material.shader = Shader.Find("Standard");
			highlight = 0;
		}
		// Destroy(gameObject);
	}
	// Use this for initialization
	void Start () {

	}

	// Update is called once per frame
	void Update () {

	}
}