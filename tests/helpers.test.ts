import { describe, test, expect, vi } from "vitest"

import { getParams, normalize, testRoute } from "./../src/helpers"

describe("url normalization", () => {
  test("no modification", () => {
    const url = "/foo"

    expect(normalize(url)).toBe(url)
  })

  test("removing extra /", () => {
    expect(normalize("//foo")).toBe("/foo")
    expect(normalize("/foo//bar")).toBe("/foo/bar")
    expect(normalize("/foo///bar")).toBe("/foo/bar")
    expect(normalize("//foo//bar")).toBe("/foo/bar")
    expect(normalize("/foo//")).toBe("/foo")
    expect(normalize("//foo//bar/")).toBe("/foo/bar")
  })
})

describe("test route", () => {
  test("no param", () => {
    expect(testRoute("/foo", "/foo/")).toBe(true)
    expect(testRoute("//bar", "/foo")).toBe(false)
  })

  test("with params", () => {
    expect(testRoute("/foo/:id", "/foo/2")).toBeTruthy()
    expect(testRoute("/foo//:slg//:id", "//foo/bar/2")).toBeTruthy()
    expect(testRoute("/foo/:slg-:id", "/foo//bar-2/")).toBeTruthy()
  })
})

describe("getParams", () => {
  test("no param", () => {
    expect(getParams("/foo", "/foo/")).toEqual({})
    expect(getParams("//bar", "/foo")).toEqual({})
  })

  test("with params", () => {
    expect(getParams("/foo/:id", "/foo/2")).toEqual({ id: "2" })
    expect(getParams("/foo/:id", "/bar/2")).toEqual({})
    expect(getParams("/foo//:slg//:id", "//foo/bar/2")).toEqual({ slg: "bar", id: "2" })
    expect(getParams("/foo/:slg-:id", "/foo//bar-2/")).toEqual({ slg: "bar", id: "2" })
  })
})
